module.exports = {
    HOST: "localhost",
    USER: "supun",
    PASSWORD: "1234",
    DB: "Student",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

//spring.jpa.hibernate.ddl-auto=update
//spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/insurance
//spring.datasource.username=supun
//spring.datasource.password=1234
//spring.datasource.driver-class-name =com.mysql.jdbc.Driver
//#spring.jpa.show-sql: true