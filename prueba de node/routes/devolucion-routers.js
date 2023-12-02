const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de devolucions
router.get('/devoluciones', async (req, res) => {
    const devolucions = [];
    sql="SELECT * FROM DEVOLUCIONES";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(devolucions);

    result.rows.map(devolucion=>{
        let userSchema = {
            "DEVOLUCIONID": devolucion[0],
            "CLIENTEID": devolucion[1],
            "EMPLEADOID": devolucion[2],
            "FECHADEVOLUCION": devolucion[3]
        }
        devolucions.push(userSchema)
    });
    res.json({devolucions});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/devoluciones/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Mapear el resultado y enviarlo como respuesta
        const sql = "SELECT * FROM DEVOLUCIONES WHERE DEVOLUCIONID = :ID"; 
        const result = await BD.Open(sql, [ID], false);

        const devolucion = {
            "DEVOLUCIONID": result.rows[0][0],
            "CLIENTEID": result.rows[0][1],
            "EMPLEADOID": result.rows[0][2],
            "FECHADEVOLUCION": result.rows[0][3]
        };

        res.status(200).json({ devolucion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/devoluciones', async (req, res) => {
    const {DEVOLUCIONID, CLIENTEID, EMPLEADOID, FECHADEVOLUCION} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO DEVOLUCIONES (DEVOLUCIONID, CLIENTEID, EMPLEADOID, FECHADEVOLUCION) VALUES (:DEVOLUCIONID, :CLIENTEID, :EMPLEADOID, :FECHADEVOLUCION)";
        console.log('Consulta SQL:', sql);
        const bindParams = [DEVOLUCIONID, CLIENTEID, EMPLEADOID, FECHADEVOLUCION];

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
router.put('/devoluciones/:ID', async (req, res) => {
    const { ID } = req.params;
    const {CLIENTEID, EMPLEADOID, FECHADEVOLUCION } = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE DEVOLUCIONES SET CLIENTEID=:CLIENTEID, EMPLEADOID=:EMPLEADOID,  FECHADEVOLUCION=:FECHADEVOLUCION WHERE DEVOLUCIONID = :ID"
        const bindParams = [CLIENTEID, EMPLEADOID, FECHADEVOLUCION, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});



// eliminar un registro segun el ID
router.delete('/devoluciones/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Eliminar el registro
        const deleteQuery = "DELETE FROM DEVOLUCIONES WHERE DEVOLUCIONID = :ID";
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
