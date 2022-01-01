const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `Profile_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    // register new student
    router.post("/add", students.create);

    // Update a student with id
    router.put("/addImage/:id", upload.single('file'), students.update);

    // Retrieve all Tutorials
    router.get("/getall", students.findAll);

    // Delete a Tutorial with id
    router.delete("/delete", students.delete);

    app.use('/students', router);

};