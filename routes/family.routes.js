module.exports = app => {
    const families = require("../controllers/family.controller.js");

    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/getall", families.findAll);

    app.use('/families', router);
};