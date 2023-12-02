const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de sos
router.get('/so', async (req, res) => {
    const sos = [];
    sql="select * from so";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(sos);

    result.rows.map(so=>{
        let userSchema = {
            "soID": so[0],
            "nombre_so": so[1]
        }
        sos.push(userSchema)
    });
    res.json({sos});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/so/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Mapear el resultado y enviarlo como respuesta
        const sql = "SELECT * FROM so WHERE soID = :ID"; 
        const result = await BD.Open(sql, [ID], false);

        const so = {
            "soID": result.rows[0][0],
            "nombre_so": result.rows[0][1]
        };

        res.status(200).json({ so });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/so', async (req, res) => {
    const {SOID, NOMBRE_SO} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO so (SOID, NOMBRE_SO) VALUES (:SOID, :NOMBRE_SO)";
        console.log('Consulta SQL:', sql);
        const bindParams = [SOID, NOMBRE_SO];

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
router.put('/so/:ID', async (req, res) => {
    const { ID } = req.params;
    const {NOMBRE_SO } = req.body;


    try {
        // Actualizar el registro
        const updateQuery = "UPDATE so SET NOMBRE_SO=:NOMBRE_SO WHERE SOID = :ID"
        const bindParams = [NOMBRE_SO, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});



// eliminar un registro segun el ID
router.delete('/so/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Eliminar el registro
        const deleteQuery = "DELETE FROM so WHERE soID = :ID";
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
