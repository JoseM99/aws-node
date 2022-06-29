const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'database-articulos.cqwwrlpyw7fa.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'Articulos22'
})
 
 
mysqlConnection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }else
        console.log('Conexion de BD realizada Correctamente..');
});

module.exports= mysqlConnection;   