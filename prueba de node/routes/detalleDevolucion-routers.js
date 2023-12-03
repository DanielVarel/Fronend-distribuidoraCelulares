const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de detalle_devolucions
router.get('/detalle_devoluciones', async (req, res) => {
    const detalle_devoluciones = [];
    sql="SELECT * FROM DETALLE_DEVOLUCION";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(detalle_devoluciones);

    result.rows.map(detalle_devolucion=>{
        let userSchema = {
            "DEVOLUCIONID": detalle_devolucion[0],
            "CELULARID": detalle_devolucion[1],
            "CANTIDAD": detalle_devolucion[2],
            "MOTIVO_DEVOLUCION": detalle_devolucion[3]
        }
        detalle_devoluciones.push(userSchema)
    });
    res.json({detalle_devoluciones});
});



//=================================================================================================
// devolver los registros de una devolucion con el id especifico

router.get('/detalle_devoluciones/:ID', async (req, res) => {
    const detalle_devoluciones = [];
    const { ID } = req.params;
    sql="SELECT * FROM DETALLE_DEVOLUCION WHERE DEVOLUCIONID = :ID";

    let result = await BD.Open(sql,[ID],false);
    console.log(result.rows);
    
    console.log(detalle_devoluciones);

    result.rows.map(detalle_devolucion=>{
        let userSchema = {
            "DEVOLUCIONID": detalle_devolucion[0],
            "CELULARID": detalle_devolucion[1],
            "CANTIDAD": detalle_devolucion[2],
            "MOTIVO_DEVOLUCION": detalle_devolucion[3]
        }
        detalle_devoluciones.push(userSchema)
    });
    res.json({detalle_devoluciones});
});



//=================================================================================================
//insertar un nuevo registro
router.post('/detalle_devoluciones', async (req, res) => {
    const {DEVOLUCIONID, CELULARID, CANTIDAD, MOTIVO_DEVOLUCION} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO detalle_devolucion (DEVOLUCIONID, CELULARID, CANTIDAD, MOTIVO_DEVOLUCION) VALUES (:DEVOLUCIONID, :CELULARID, :CANTIDAD, :MOTIVO_DEVOLUCION)";
        console.log('Consulta SQL:', sql);
        const bindParams = [DEVOLUCIONID, CELULARID, CANTIDAD, MOTIVO_DEVOLUCION];

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
router.put('/detalle_devoluciones/:dID/:cID', async (req, res) => {
    const dID = req.params.dID;
    const cID = req.params.cID;
    const { CANTIDAD, MOTIVO_DEVOLUCION } = req.body;
    if(!CANTIDAD){console.log('Cantidad vacia')};
    try {
        // Actualizar el registro
        const updateQuery = "UPDATE DETALLE_DEVOLUCION SET CANTIDAD=:CANTIDAD, MOTIVO_DEVOLUCION=:MOTIVO_DEVOLUCION WHERE DEVOLUCIONID = :dID AND CELULARID = :cID"
        const bindParams = {CANTIDAD, MOTIVO_DEVOLUCION, dID, cID};

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});




// eliminar un registro segun el ID
router.delete('/detalle_devoluciones/:dID/:cID', async (req, res) => {
    const dID = req.params.dID;
    const cID = req.params.cID;
    try {
        // Eliminar el registro
        const deleteQuery = "DELETE FROM DETALLE_DEVOLUCION WHERE DEVOLUCIONID = :dID AND CELULARID = :cID" ;
        const bindParams = {dID, cID};
        let result = await BD.Open(deleteQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
    }
});



module.exports = router;
