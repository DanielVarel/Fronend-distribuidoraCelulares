const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de detalle_compras
router.get('/detalle_compras', async (req, res) => {
    const detalle_compras = [];
    sql="SELECT * FROM DETALLE_COMPRA";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(detalle_compras);

    result.rows.map(detalle_compra=>{
        let userSchema = {
            "COMPRAID": detalle_compra[0],
            "CELULARID": detalle_compra[1],
            "CANTIDAD": detalle_compra[2]
        }
        detalle_compras.push(userSchema)
    });
    res.json({detalle_compras});
});



//=================================================================================================
// devolver los registros de una compra con el id especifico

router.get('/detalle_compras/:ID', async (req, res) => {
    const detalle_compras = [];
    const { ID } = req.params;
    sql="SELECT * FROM DETALLE_COMPRA WHERE COMPRAID = :ID";

    let result = await BD.Open(sql,[ID],false);
    console.log(result.rows);
    
    console.log(detalle_compras);

    result.rows.map(detalle_compra=>{
        let userSchema = {
            "COMPRAID": detalle_compra[0],
            "CELULARID": detalle_compra[1],
            "CANTIDAD": detalle_compra[2]
        }
        detalle_compras.push(userSchema)
    });
    res.json({detalle_compras});
});



//=================================================================================================
//insertar un nuevo registro
router.post('/detalle_compras', async (req, res) => {
    const {COMPRAID, CELULARID, CANTIDAD} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO detalle_compra (COMPRAID, CELULARID, CANTIDAD) VALUES (:COMPRAID, :CELULARID, :CANTIDAD)";
        console.log('Consulta SQL:', sql);
        const bindParams = [COMPRAID, CELULARID, CANTIDAD];

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
router.put('/detalle_compras/:dID/:cID', async (req, res) => {
    const dID = req.params.dID;
    const cID = req.params.cID;
    const { CANTIDAD } = req.body;
    
    try {
        // Actualizar el registro
        const updateQuery = "UPDATE DETALLE_COMPRA SET CANTIDAD=:CANTIDAD WHERE COMPRAID = :dID AND CELULARID = :cID"
        const bindParams = {CANTIDAD, dID, cID};

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});




// eliminar un registro segun el ID
router.delete('/detalle_compras/:compraID/:cID', async (req, res) => {
    const compraID = req.params.compraID;
    const cID = req.params.cID;
    try {
        // Eliminar el registro
        const deleteQuery = "DELETE FROM DETALLE_COMPRA WHERE COMPRAID = :compraID AND CELULARID = :cID" ;
        const bindParams = {compraID, cID};
        let result = await BD.Open(deleteQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
    }
});



module.exports = router;
