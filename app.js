const express = require("express");
const app = express();
const movies = require("./routes/movies");
const webseries = require("./routes/web_series");
const auth = require("./routes/auth");
const router = require("./routes/movies");
const middlewareAuth = require("./middlewares/auth");

app.use(express.json());
app.use(router);
app.use("/api/login", auth);
app.use("/api/movies", [middlewareAuth.verifyJWT], movies);
app.use("/api/web-series", [middlewareAuth.verifyJWT], webseries);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server listening on port : ${port}`));
