const mysql = require('mysql');

const con = mysql.createConnection({
    host: "sql102.epizy.com",
    database: "epiz_30984387_tablaPuntuaciones",
    user: "epiz_30984387",
    password: "JMwmXIlnXVnVF"
});

con.connect((err)=>{
    if(err) throw err;
    console.log('Conectado a BBDD');
});
 
module.exports = con;