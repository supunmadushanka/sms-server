module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING
        },
        school: {
            type: Sequelize.STRING
        }
    });

    return Student;
};