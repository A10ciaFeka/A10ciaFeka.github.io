const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

//Configuración de puerto
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use(require('./routes/user.js'));



//Inicializando el servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto '+app.get('port'));
});
