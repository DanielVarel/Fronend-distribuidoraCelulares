const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de marcas
router.get('/marcas', async (req, res) => {
    const marcas = [];
    sql="select * from marca";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(marcas);

    result.rows.map(marca=>{
        let userSchema = {
            "marcaID": marca[0],
            "nombre_marca": marca[1]
        }
        marcas.push(userSchema)
    });
    res.json({marcas});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/marcas/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Mapear el resultado y enviarlo como respuesta
        const sql = "SELECT * FROM marca WHERE marcaID = :ID"; 
        const result = await BD.Open(sql, [ID], false);

        const marca = {
            "marcaID": result.rows[0][0],
            "nombre_marca": result.rows[0][1]
        };

        res.status(200).json({ marca });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/marcas', async (req, res) => {
    const {marcaID, nombre_marca} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO marca (MARCAID, NOMBRE_MARCA) VALUES (:MARCAID, :NOMBRE_MARCA)";
        console.log('Consulta SQL:', sql);
        const bindParams = [marcaID, nombre_marca];

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
router.put('/marcas/:ID', async (req, res) => {
    const { ID } = req.params;
    const {NOMBRE_MARCA } = req.body;

    if (NOMBRE_MARCA === null || NOMBRE_MARCA === undefined) {
        // Si NOMBRE_MARCA es null o undefined, enviar un error
        return res.status(400).json({ error: "El campo NOMBRE_MARCA es requerido" });
    }
    try {
        // Actualizar el registro
        const updateQuery = "UPDATE MARCA SET NOMBRE_MARCA=:NOMBRE_MARCA WHERE MARCAID = :ID"
        const bindParams = [NOMBRE_MARCA, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});



// eliminar un registro segun el ID
router.delete('/marcas/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Eliminar el registro
        const deleteQuery = "DELETE FROM marca WHERE MARCAID = :ID";
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
