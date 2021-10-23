const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const seriesSchemas = require("../validationSchema/series");
const admin = require("../middlewares/admin");
const Joi = require("joi");

const { WebSeries } = require("../model/models");
const { webSeries } = require("../model/schema");

router.get("/list", async (req, res) => {
  await WebSeries.find((err, result) => {
    if (err) return err;
    let results = result.map((items) => {
      return { seriesName: items._doc.name };
    });
    res.send(results);
  }).clone();
});

router.get("/lists", async (req, res) => {
  await WebSeries.find({}, function (err, result) {
    if (err) return err;
    let results = result.map((item) => {
      return item._doc;
    });
    res.send(results);
  }).clone();
});

router.get("/list/:id", async (req, res) => {
  await WebSeries.find({ id: req.params.id }, function (err, result) {
    if (err) return err;
    let results = result.map((item) => {
      return item._doc;
    });
    res.send(results);
  }).clone();
});

router.get("/objectId/:id", async (req, res) => {
  const webSeries = await WebSeries.findById(req.params.id);

  if (!webSeries) return res.status(404).send(" not found.");

  res.send(webSeries);
});

router.get("/:id", async (req, res) => {
  const webSeries = await WebSeries.findById({ id: ObjectId(req.params.id) });

  if (!webSeries) return res.status(404).send(" not found.");

  res.send(webSeries);
});

router.post(
  "/add",
  [auth.verifyJWT, admin],
  validator.body(seriesSchemas.SeriesValidation),
  async (req, res) => {
    // Creating Object of WebSeries Model
    const webSeriesPromiss = new WebSeries();
    //  Data Collecting in Object of WebSeries Model
    webSeriesPromiss.id = req.body.id;
    webSeriesPromiss.name = req.body.name;
    webSeriesPromiss.genere = req.body.genere;
    webSeriesPromiss.imdb = req.body.imdb;
    webSeriesPromiss.platform = req.body.platform;
    //  Processing the data
    await webSeriesPromiss
      .save()
      .then(() => {
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });
    //  Response
    res.send("Done");
  }
);

router.put("/update/:id", [auth.verifyJWT, admin], async (req, res) => {
  const webSeries = await WebSeries.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });

  if (!webSeries) return res.status(404).send(" not found.");

  res.send(webSeries);
});

router.delete("/delete/:id", [auth.verifyJWT, admin], async (req, res) => {
  await WebSeries.findByIdAndRemove({ _id: req.params.id });

  res.send(webSeries);
});

module.exports = router;
