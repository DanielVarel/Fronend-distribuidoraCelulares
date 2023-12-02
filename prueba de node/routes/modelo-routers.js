const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de modelos
router.get('/modelos', async (req, res) => {
    const modelos = [];
    sql="select * from modelo";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(modelos);

    result.rows.map(modelo=>{
        let userSchema = {
            "modeloID": modelo[0],
            "nombre_modelo": modelo[1]
        }
        modelos.push(userSchema)
    });
    res.json({modelos});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/modelos/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Mapear el resultado y enviarlo como respuesta
        const sql = "SELECT * FROM modelo WHERE modeloID = :ID"; // Reemplaza 'tu_tabla' con el nombre de tu tabla
        const result = await BD.Open(sql, [ID], false);

        const modelo = {
            "modeloID": result.rows[0][0],
            "nombre_modelo": result.rows[0][1]
        };

        res.status(200).json({ modelo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/modelos', async (req, res) => {
    const {MODELOID, NOMBRE_MODELO} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO modelo (MODELOID, NOMBRE_MODELO) VALUES (:MODELOID, :NOMBRE_MODELO)";
        console.log('Consulta SQL:', sql);
        const bindParams = [MODELOID, NOMBRE_MODELO];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});



//=================================================================================================
// actualizar un registro especifico segun el ID
router.put('/modelos/:ID', async (req, res) => {
    const { ID } = req.params;
    const {NOMBRE_MODELO } = req.body;


    try {
        // Actualizar el registro
        const updateQuery = "UPDATE modelo SET NOMBRE_MODELO=:NOMBRE_MODELO WHERE MODELOID = :ID"
        const bindParams = [NOMBRE_MODELO, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});



// eliminar un registro segun el ID
router.delete('/modelos/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Eliminar el registro
        const deleteQuery = "DELETE FROM modelo WHERE modeloID = :ID";
        const bindParams = [ID];

        let result = await BD.Open(deleteQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
    }
});



module.exports = router;
