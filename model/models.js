const {movies, webSeries} = require('./schema')
// Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Cinema');
// Models
const Movies = mongoose.model('movies', movies);
const WebSeries = mongoose.model('webseries',webSeries);
// Exports
module.exports = {Movies, WebSeries}