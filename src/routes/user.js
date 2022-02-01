const express = require('express');
const router = express.Router();

const mysqlConn = require('../database');
const crtQuery = require('../createQuery');
const jsonRes = require('../jsonResult');


router.get('/user/:user_name',(req,res)=>{
    crtQuery.getUserByName(req,res);
});

router.post('/user',(req,res)=>{
    crtQuery.addUserPoints(req,res);
});

router.put('/user/:user_name',(req,res)=>{
    crtQuery.modUserPoints(req,res);
});

module.exports = router;