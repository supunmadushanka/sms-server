module.exports = (sequelize, Sequelize) => {
    const Family = sequelize.define("family", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Family;
};