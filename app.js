const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");

const homeRoutes = require("./routes/home");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoutes);

app.listen(3000);
