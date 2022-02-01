const { type } = require('express/lib/response');
const mysqlConn = require('./database');
const jsonRes = require('./jsonResult');

/*
*
*   USUARIO
*
*/

const getUserByName = (req,res)=>{
    const sql = 'SELECT * FROM general WHERE nombre='+req.params.user_name;
    mysqlConn.query(sql,(err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
}

const addUserPoints = (req,res)=>{
    const {user_name,user_points} = req.body;
    const sql = `INSERT INTO general VALUES ('${user_name}','${user_points}')`;
    mysqlConn.query(sql,(err, rows, fields) =>{
        jsonRes.getResult(err,res, rows.insertId);
    });
}

const modUserPoints = (req,res)=>{
    const {user_name,user_points} = req.body;
    const sql = `UPDATE general SET nombre = '${user_name}', puntuacion='${user_points}' WHERE nombre=${req.params.user_name}`;
    mysqlConn.query(sql,(err, rows, fields) =>{
        jsonRes.getResult(err,res, rows.insertId);
    });
}

exports.getUserByName = getUserByName;
exports.addUserPoints = addUserPoints;
exports.modUserPoints = modUserPoints;