const getResult = (err,res,id=undefined)=>{
    if(!err){
        if(!id){
            res.json({Resultado: 'Operación producida con éxito'});
        }else{
            res.json({Resultado: 'Operación producida con éxito',id: id});
        }
    }else{
        res.json(err);
    }
} 
exports.getResult = getResult;