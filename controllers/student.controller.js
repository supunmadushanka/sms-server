const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;
const fs = require('fs')

exports.create = (req, res) => {
    try {
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
                        err.message || "Some error occurred while creating the Student."
                });
            });
    } catch (error) {
        res.send({
            message: "Database Error Occurred !",
        });
    }
};

exports.update = (req, res) => {
    try {
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
                        message: "Error updating Student with id=" + id
                    });
                });
        }
    } catch (error) {
        res.send({
            message: "Database Error Occurred !",
        });
    }
};

exports.findAll = (req, res) => {
    try {
        Student.findAll()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Student."
                });
            });
    } catch (error) {
        res.send({
            message: "Database Error Occurred !",
        });
    }
};

exports.delete = (req, res) => {
    try {
        const id = req.body.key;
        Student.findByPk(id)
            .then((result) => {
                if (result.dataValues.profile_picture) {
                    imgURL = result.dataValues.profile_picture.split("http://localhost:3000/").pop();
                    removeURL = './public/' + imgURL
                    console.log(removeURL)
                    fs.unlink(removeURL, (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                }
                Student.destroy({
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Student was deleted successfully!"
                            });
                        } else {
                            res.send({
                                message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Student with id=" + id
                        });
                    });
            })
    } catch (error) {
        res.send({
            message: "Database Error Occurred !",
        });
    }
};

exports.updateStudent = (req, res) => {
    try {
        const id = req.body.key;
        Student.update(JSON.parse(req.body.values), {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Student was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Student with id=" + id
                });
            });
    } catch (error) {
        res.send({
            message: "Database Error Occurred !",
        });
    }
};