const express = require("express");
// Initializing router for whole file
const router = express.Router();
// For validation
const validator = require("express-joi-validation").createValidator({});
const JoiSchemas = require("../validationSchema/movie");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const Joi = require("joi");
const { Movies } = require("../model/models");
const { movies } = require("../model/schema");

router.get("/list", async (req, res) => {
  await Movies.find({}, function (err, users) {
    if (err) return err;
    let movieList = users.map((item) => {
      return { name: item._doc.name };
    });
    res.send(movieList);
  }).clone();
});

router.get("/lists", async (req, res) => {
  await Movies.find({}, function (err, users) {
    if (err) return err;
    let movieList = users.map((item) => {
      return item._doc;
    });
    res.send(movieList);
  }).clone();
});

router.get("/list/objectId/:id", async (req, res) => {
  await Movies.find({ _id: req.params.id }, function (err, users) {
    if (err) return err;
    res.send(
      users.map((item) => {
        return item._doc;
      })
    );
  }).clone();
});

router.get("/objectId/:id", async (req, res) => {
  const movies = await Movies.findById(req.params.id);

  if (!movies) return res.status(404).send(" not found.");

  res.send(movies);
});

router.get("/list/:id", async (req, res) => {
  await Movies.find({ id: req.params.id }, function (err, result) {
    if (err) return err;
    let results = result.map((item) => {
      return item._doc;
    });
    res.send(results);
  }).clone();
});

router.post(
  "/add",
  [auth.verifyJWT, admin],
  validator.body(JoiSchemas.InfoValidation),
  async (req, res) => {
    const moviesPromise = new Movies();

    moviesPromise.id = req.body.id;
    moviesPromise.name = req.body.name;
    moviesPromise.genere = req.body.genere;
    moviesPromise.rating = req.body.rating;
    moviesPromise.releasedate = req.body.releasedate;

    await moviesPromise
      .save()
      .then(() => console.log("Done"))
      .catch((err) => console.log("error"));

    res.send("Done");
  }
);

router.put("/update/:id", [auth.verifyJWT, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const movies = await Movies.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name }
  );

  if (!movies) return res.status(404).send(" not found.");

  res.send(movies);
});

router.delete("/delete/:id", [auth.verifyJWT, admin], async (req, res) => {
  await Movies.findByIdAndRemove({ _id: req.params.id });
  res.send(movies);
});

function validate(req) {
  const schema = {
    name: Joi.string().required(),
    genere: Joi.string().required(),
    rating: Joi.number().required(),
    releasedate: Joi.string().required(),
  };
  return validator.body(req, schema);
}

module.exports = router;
