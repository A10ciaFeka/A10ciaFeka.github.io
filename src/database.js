const mysql = require('mysql');

const con = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    database: "heroku_7652922298a0c7a",
    user: "b86c0fee349ce9",
    password: "14353ad8"
});

con.connect((err)=>{
    if(err) throw err;
    console.log('Conectado a BBDD');
});
 
module.exports = con;