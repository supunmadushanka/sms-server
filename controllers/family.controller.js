const db = require("../models");
const Family = db.families;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Family.findAll()
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