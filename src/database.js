const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'Articulos22'
});

mysqlConnection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }else
        console.log('Conexion de BD realizada Correctamente..');
});

module.exports= mysqlConnection;   