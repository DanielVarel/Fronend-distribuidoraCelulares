const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/proveedores', async (req, res) => {
    const proveedores = [];
    sql="select proveedorID, nombre_proveedor, DIRECCION.colonia, PAIS.nombre_pais, telefono, correo from proveedor INNER JOIN PAIS on PROVEEDOR.paisID = PAIS.paisID "+
    "INNER JOIN DIRECCION ON PROVEEDOR.direccionID = DIRECCION.direccionID";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(proveedores);

    result.rows.map(prove=>{
        let userSchema = {
            "proveedorID": prove[0],
            "NOMBRE_PROVEEDOR": prove[1],
            "DIRECCIONID": prove[2],
            "PAISID": prove[3],
            "TELEFONO": prove[4],
            "CORREO": prove[5]
        }
        proveedores.push(userSchema)
    });
    res.json({proveedores});
});


// devolver un registro con el id especifico
router.get('/proveedores/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por DNI
        const selectQuery = "SELECT * FROM proveedor WHERE ID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const proveedor = {
            "proveedorID":  result.rows[0][0],
            "NOMBREPROVEEDOR": result.rows[0][1],
            "DIRECCIONID": result.rows[0][2],
            "PAISID": result.rows[0][3],
            "TELEFONO": result.rows[0][4],
            "CORREO": result.rows[0][5],

        };

        res.status(200).json({ proveedor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/proveedores', async (req, res) => {
    const {ID, NOMBRE_PROVEEDOR, DIRECCIONID, PAISID, TELEFONO, CORREO} = req.body;

    console.log(req.body)

    if (!NOMBRE_PROVEEDOR || !DIRECCIONID ||  !PAISID || !TELEFONO || !CORREO) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // verificar que todas las id sean distintos
        // const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM clientes WHERE ID = :ID";
        // const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        // if (checkResult.rows[0][0] > 0) {
        //     return res.status(400).json({ error: "Ya existe un registro con este ID" });
        // }

        const sql = "INSERT INTO proveedor (NOMBRE_PROVEEDOR, DIRECCIONID, PAISID, TELEFONO, CORREO) VALUES (:NOMBRE_PROVEEDOR, :DIRECCIONID, :PAISID, :TELEFONO, :CORREO)";
        console.log('Consulta SQL:', sql);
        const bindParams = [NOMBRE_PROVEEDOR, DIRECCIONID, PAISID, TELEFONO, CORREO];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});


// actualizar un registro especifico segun el ID
router.put('/proveedores/:ID', async (req, res) => {
    const { ID } = req.params;
    const { NOMBRE_PROVEEDOR, DIRECCIONID, PAISID, TELEFONO, CORREO } = req.body;

    if (!NOMBRE_PROVEEDOR || !DIRECCIONID || !PAISID ||!TELEFONO ||!CORREO) {
        return res.status(400).json({ error: "NombreProveedor y CORREO son campos requeridos" });
    }

    try {
        // Verificar si el DNI existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM proveedor WHERE ID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Actualizar el registro
        const updateQuery = "UPDATE proveedor SET NOMBRE_PROVEEDOR = :NOMBRE_PROVEEDOR,  DIRECCIONID = : DIRECCIONID, PAISID = :PAISID, TELEFONO = :TELEFONO, CORREO = :CORREO WHERE ID = :ID";
        const bindParams = [NOMBRE_PROVEEDOR, DIRECCIONID, PAISID, TELEFONO, CORREO, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/proveedores/:ID', async (req, res) => {
const { ID } = req.params;

try {
 // Verificar si el ID existe
const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM proveedor WHERE ID = :ID";
const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

if (checkResult.rows[0][0] === 0) {
    return res.status(404).json({ error: "No se encontró un registro con este ID" });
}

 // Eliminar el registro
const deleteQuery = "DELETE FROM proveedor WHERE ID = :ID";
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