module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        first_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING
        },
        school: {
            type: Sequelize.STRING
        },
        profile_picture: {
            type: Sequelize.STRING
        }
    });

    return Student;
};