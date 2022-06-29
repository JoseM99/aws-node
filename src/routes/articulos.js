const express = require ('express');
const mysqlConnection = require('../database');
const router = express.Router();

const conexion = require('../database');

//AGREGAR METODO PARA LISTAR POR COMPLETO
router.get('/', (req,res) =>{
    

    console.log("eduardo");
    result= "players:[";

    conexion.query('SELECT * FROM TablaArticulos', (err,rows,fields) => {
        let userIds = "";
        let result= '{"data":[';
        for (var i=0, len=rows.length; i<len; i++){
            userIds += rows[i].id + ",";
            result= result+ '{ "id":"' +  rows[i].id + '", "descripcion":"' + rows[i].descripcion + '", "precio":"' + rows[i].precio + '", "stock":"' + rows[i].stock + '"},';

        }

        result= result.substring(0, result.length - 1);  
        result= result + ']}'

        console.log(result);
        //const parseJson = require('json-parse-even-better-errors');
        //parseJson('garbage');
        // parseJson(result);
        // json data
        var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
        /*
        {data:[
            { id:1, descripcion:Televisores UltraHD, precio:2000, stock:56},
            { id:2, descripcion:Equipos Sony, precio:1890, stock:28},
            { id:3, descripcion:bicicleta, precio:1400, stock:32},
            { id:4, descripcion:Licuadora IMACO, precio:1956, stock:8}
        ]}
        */ 
        
        // parse json
        var jsonParsed = JSON.parse(result);

        console.log(jsonParsed);
        //res.contentType('application/json');
        //myJSONstring = JSON.stringify(result);
        res.json(jsonParsed);
        //var json = JSON.parse(result);
        //res.send(json);
        //  console.log(userIds);
        //  res.json(userIds);
        // if(!err){
        //     res.json(rows);
        // }else{
        //     console.log(err); 
        // }
    })
});

//METODO PARA LISTAR POR ID
router.get('/:id', (req,res) =>{
    const {id} = req.params;
    conexion.query('SELECT * FROM TablaArticulos WHERE id= ?',[id], (err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err); 
        }
    })
});

//METODO PARA AGREGAR
router.post('/' , (req,res) =>{
   const {id,descripcion,precio,stock} = req.body;
   console.log(req.body);
   const query =  `CALL articulosAgregarOrEditar (?,?,?,?); `; 
    
   mysqlConnection.query(query,[id,descripcion,precio,stock], (err,rows,fields) =>{
        if(!err){
            res.json({Status: 'Articulo Agregado Correctamente: '});    
        }else{
            console.log(err); 
        }
   });

}) 

//METODO PARA 
router.put('/:id' , (req,res) =>{
    const {descripcion,precio,stock} = req.body;
    const { id } = req.params;
    const query = `CALL articulosAgregarOrEditar (?,?,?,?); `; 
     
    mysqlConnection.query(query,[id,descripcion,precio,stock], (err,rows,fields) =>{
         if(!err){
             res.json({Status: 'Articulo Actualizado Correctamente: '});    
         }else{
             console.log(err); 
         }
    });
 
 })

//METODO PARA ELIMINAR
router.delete('/:id' , (req,res) =>{
    const { id } = req.params;  
    mysqlConnection.query('DELETE FROM TablaArticulos WHERE id= ?' ,[id], (err,rows,fields) =>{
         if(!err){
             res.json({Status: 'Articulo Eliminado Correctamente: '});    
         }else{
             console.log(err); 
         }
    });
 
 })

module.exports = router;