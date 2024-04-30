const mysql = require("mysql2");

let connDB = () =>
{

    return  mysql.createConnection({
        host: "159.223.111.107",
       //host: "localhost",
        user: "root",
        database: "compostlab",
        password: "Pum@15001232023*",
       // password: "",
        port: 3306
    });

}

module.exports = connDB