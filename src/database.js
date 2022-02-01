const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    database: "puntuacion",
    user: "root",
    password: ""
});

con.connect((err)=>{
    if(err) throw err;
    console.log('Conectado a BBDD');
});
 
module.exports = con;