const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/ventas', async (req, res) => {
    const ventas = [];
    sql="SELECT venta.ventaid, clientes.dni AS clienteDNI, empleado.dni AS empleadoDNI,  venta.fecha_venta, tipo_pago.metodo_pago FROM venta INNER JOIN clientes ON venta.clienteid = clientes.id INNER JOIN empleado ON venta.empleadoid = empleado.empleadoid INNER JOIN tipo_pago ON venta.tipopagoid = tipo_pago.tipopagoid";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(ventas);

    result.rows.map(ven=>{
        let userSchema = {
            "ID": ven[0],
            "Cliente": ven[1],
            "Empleado": ven[2],
            "FechaVenta": ven[3],
            "TipoPago": ven[4]
            
        }
        ventas.push(userSchema)
    });
    res.json({ventas});
});


// devolver un registro con el id especifico
router.get('/ventas/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por DNI
        const selectQuery = "SELECT * FROM venta WHERE ID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const venta = {
            "ID":  result.rows[0][0],
            "FechVenta": result.rows[0][1],
            "Cliente": result.rows[0][2],
            "Empleado": result.rows[0][3],
            "TipoPago": result.rows[0][4]
        
        };

        res.status(200).json({ venta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/ventas', async (req, res) => {
    const {ID, FECHA_VENTA, CLIENTEID, EMPLEADOID, TIPOPAGOID} = req.body;

    console.log(req.body)

    if (!FECHA_VENTA || !CLIENTEID ||  !EMPLEADOID || !TIPOPAGOID) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // verificar que todas las id sean distintos
        // const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM clientes WHERE ID = :ID";
        // const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        // if (checkResult.rows[0][0] > 0) {
        //     return res.status(400).json({ error: "Ya existe un registro con este ID" });
        // }

        const sql = "INSERT INTO cliente (FECHA_VENTA, CLIENTEID, EMPLEADOID, TIPOPAGOID) VALUES (:FECHA_VENTA, :CLIENTEID, :EMPLEADOID, :TIPOPAGOID)";
        console.log('Consulta SQL:', sql);
        const bindParams = [FECHA_VENTA, CLIENTEID, EMPLEADOID, TIPOPAGOID];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});


// actualizar un registro especifico segun el ID
router.put('/ventas/:ID', async (req, res) => {
    const { ID } = req.params;
    const { FECHA_VENTA, CLIENTEID, EMPLEADOID, TIPOPAGOID } = req.body;

    if (!FECHA_VENTA|| !CLIENTEID || !EMPLEADOID || !TIPOPAGOID) {
        return res.status(400).json({ error: "NOMBRE, APELLIDO y CORREO son campos requeridos" });
    }

    try {
        // Verificar si el DNI existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM venta WHERE ID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Actualizar el registro
        const updateQuery = "UPDATE venta SET FECHA_VENTA = :FECHA_VENTA, CLIENTEID = :CLIENTEID, EMPLEADOID = :EMPLEADOID, TIPOPAGOID= :TIPOPAGOID  WHERE ID = :ID";
        const bindParams = [FECHA_VENTA, CLIENTEID, EMPLEADOID, TIPOPAGOID, ID];

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