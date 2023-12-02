const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de facturas
router.get('/facturas', async (req, res) => {
    const facturas = [];
    sql="SELECT * FROM FACTURA";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(facturas);

    result.rows.map(factura=>{
        let userSchema = {
            "VENTAID": factura[0], 
            "TOTAL_VENTA": factura[1],
            "ISV": factura[2], 
            "TOTAL_NETO": factura[3]
        }
        facturas.push(userSchema)
    });
    res.json({facturas});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/facturas/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Mapear el resultado y enviarlo como respuesta
        const sql = "SELECT * FROM FACTURA WHERE VENTAID = :ID"; 
        const result = await BD.Open(sql, [ID], false);

        const factura = {
            "VENTAID": result.rows[0][0],
            "TOTAL_VENTA": result.rows[0][1],
            "ISV": result.rows[0][2],
            "TOTAL_NETO": result.rows[0][3]
        };

        res.status(200).json({ factura });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/facturas', async (req, res) => {
    const {VENTAID, TOTAL_VENTA, ISV, TOTAL_NETO} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO factura (VENTAID, TOTAL_VENTA, ISV, TOTAL_NETO) VALUES (:VENTAID, :TOTAL_VENTA, :ISV, :TOTAL_NETO)";
        console.log('Consulta SQL:', sql);
        const bindParams = [VENTAID, TOTAL_VENTA, ISV, TOTAL_NETO];

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
router.put('/facturas/:ID', async (req, res) => {
    const { ID } = req.params;
    const { TOTAL_VENTA, ISV, TOTAL_NETO } = req.body;


    try {
        // Actualizar el registro
        const updateQuery = "UPDATE FACTURA SET  TOTAL_VENTA=:TOTAL_VENTA, ISV=:ISV, TOTAL_NETO=:TOTAL_NETO WHERE VENTAID = :ID"
        const bindParams = [ TOTAL_VENTA, ISV, TOTAL_NETO, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});



// eliminar un registro segun el ID
router.delete('/facturas/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Eliminar el registro
        const deleteQuery = "DELETE FROM FACTURA WHERE VENTAID = :ID";
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
