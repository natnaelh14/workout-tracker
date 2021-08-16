const Router = require("express").Router;
const path = require("path");

const htmlRoutes = new Router();

   htmlRoutes.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    htmlRoutes.get("/exercise", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    htmlRoutes.get("/stats", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    })

module.exports = htmlRoutes;