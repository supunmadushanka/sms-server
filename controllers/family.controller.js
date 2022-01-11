const db = require("../models");
const Family = db.families;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    try {
        Family.findAll()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Families."
                });
            });
    } catch (error) {
        res.send({
            message: "Database Error Occurred !",
        });
    }
};