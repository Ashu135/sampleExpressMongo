const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const movies = new Schema({
  _id: ObjectId,
  id: String,
  name: String,
  genere: String,
  rating: String,
});

const webSeries = new Schema({
  _id: ObjectId,
  id: String,
  name: String,
  genere: String,
  imdb: String,
  platform: String,
});

module.exports = { movies, webSeries };
