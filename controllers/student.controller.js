const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Student
    const student = {
        first_name: req.body.firstName,
        last_name: req.body.secondName,
        address: req.body.Address,
        school: req.body.School,
        profile_picture: null,
        familyId: req.body.Family
    };

    // Save Student in the database
    Student.create(student)
        .then(data => {
            res.status(200, { message: 'Student Added !' }).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.update =  (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const path = 'http://localhost:3000/uploads/' + file.filename;

    Student.update({ profile_picture: path}, {
        where: { id: id }
    })
        .then(num => {
            res.status(200).send({ message: "imaged added" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};