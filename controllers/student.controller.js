const db = require("../models");
const Student = db.students;
const Family = db.families;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.first_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Student
    const student = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        school: req.body.school,
        profile_picture: req.body.profile_picture,
        familyId: req.body.familyId
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

exports.update = (req, res) => {
    const id = req.params.id;
    const file = req.file;
    if (file) {
        const path = 'http://localhost:3000/uploads/' + file.filename;

        Student.update({ profile_picture: path }, {
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
    }
};

exports.findAll = (req, res) => {
    Student.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.body.key;
    console.log(req.body.key);

    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.updateStudent = (req, res) => {
    const id = req.body.key;
    Student.update(JSON.parse(req.body.values), {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};