const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/detallesVenta', async (req, res) => {
    const detalle_ventas = [];
    sql="select * from detalle_venta";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(detalle_ventas);

    result.rows.map(detalle=>{
        let userSchema = {
            "venta": detalle[0],
            "celular": detalle[1],
            "cantidad": detalle[2] 
        }
        detalle_ventas.push(userSchema)
    });
    res.json({detalle_ventas});
});


// devolver un registro con el id especifico
router.get('/detallesVenta/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por venta
        const selectQuery = "SELECT * FROM detalle_venta WHERE ventaID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const dventa = {
            "venta":  result.rows[0][0],
            "celular": result.rows[0][1],
            "cantidad": result.rows[0][2]
        
        };

        res.status(200).json({ dventa });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/detalleVenta', async (req, res) => {
    const {ID, VENTAID, CELULARID, CANTIDAD} = req.body;

    console.log(req.body)

    if (!VENTAID || !CELULARID ||  !CANTIDAD ) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // verificar que todas las id sean distintos
        // const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM clientes WHERE ID = :ID";
        // const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        // if (checkResult.rows[0][0] > 0) {
        //     return res.status(400).json({ error: "Ya existe un registro con este ID" });
        // }

        const sql = "INSERT INTO detalle_venta (VENTAID, CELULARID, CANTIDAD) VALUES (:VENTAID, :CELULARID, :CANTIDAD)";
        console.log('Consulta SQL:', sql);
        const bindParams = [VENTAID, CELULARID, CANTIDAD];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});


// actualizar un registro especifico segun el ID
router.put('/detalleVenta/:ID', async (req, res) => {
    const { ID } = req.params;
    const { VENTAID, CELULARID, CANTIDAD } = req.body;

    if (!VENTAID|| !CELULARID || !CANTIDAD) {
        return res.status(400).json({ error: "VENTA Y CELULAR son campos requeridos" });
    }

    try {
        // Verificar si el DNI existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM detalle_venta WHERE ventaID = :ventaID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Actualizar el registro
        const updateQuery = "UPDATE detalle_ve4nta SET VENTAID = :VENTAID, CELULARID = :CELULARID, CANTIDAD = :CANTIDAD  WHERE ventaID = :ventaID";
        const bindParams = [VENTAID, CELULARID, CANTIDAD, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// // eliminar un registro segun el ID
// router.delete('/fromoracle/:ID', async (req, res) => {
//     const { ID } = req.params;

//     try {
//         // Verificar si el ID existe
//         const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM personas WHERE ID = :ID";
//         const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

//         if (checkResult.rows[0][0] === 0) {
//             return res.status(404).json({ error: "No se encontró un registro con este ID" });
//         }

//         // Eliminar el registro
//         const deleteQuery = "DELETE FROM personas WHERE ID = :ID";
//         const bindParams = [ID];

//         let result = await BD.Open(deleteQuery, bindParams, true);
//         console.log(result);

//         res.status(200).json({ message: "Registro eliminado con éxito" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
//     }
// });

module.exports = router;