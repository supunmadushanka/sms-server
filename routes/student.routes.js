module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/add", students.create);
  
    app.use('/students', router);
};