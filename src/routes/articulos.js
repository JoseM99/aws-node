const express = require ('express');
const mysqlConnection = require('../database');
const router = express.Router();

const conexion = require('../database');

//AGREGAR METODO PARA LISTAR POR COMPLETO
router.get('/', (req,res) =>{
    
    conexion.query('SELECT * FROM TablaArticulos', (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err); 
        }
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
   const query = `CALL articulosAgregarOrEditar (?,?,?,?); `; 
    
   mysqlConnection.query(query,[id,descripcion,precio,stock], (err,rows,fields) =>{
        if(!err){
            res.json({Status: 'Articulo Agregado Correctamente: '});    
        }else{
            console.log(err); 
        }
   });

}) 

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