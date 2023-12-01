const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/clientes', async (req, res) => {
    const clientes = [];
    sql="select * from clientes";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(clientes);

    result.rows.map(clie=>{
        let userSchema = {
            "ID": clie[0],
            "P_NOMBRE": clie[1],
            "S_NOMBRE": clie[2],
            "P_APELLIDO": clie[3],
            "S_APELLIDO": clie[4],
            "CORREO": clie[5],
            "TELEFONO": clie[6],
            "DNI": clie[7]
        }
        clientes.push(userSchema)
    });
    res.json({clientes});
});


// devolver un registro con el id especifico
router.get('/clientes/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por DNI
        const selectQuery = "SELECT * FROM clientes WHERE ID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const cliente = {
            "ID":  result.rows[0][0],
            "P_NOMBRE": result.rows[0][1],
            "S_NOMBRE": result.rows[0][2],
            "P_APELLIDO": result.rows[0][3],
            "S_APELLIDO": result.rows[0][4],
            "CORREO": result.rows[0][5],
            "TELEFONO": result.rows[0][6],
            "DNI": result.rows[0][7]
        };

        res.status(200).json({ cliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/clientes', async (req, res) => {
    const {ID, P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, CORREO, TELEFONO, DNI} = req.body;

    console.log(req.body)

    if (!P_NOMBRE || !S_NOMBRE ||  !P_APELLIDO || !S_APELLIDO || !CORREO || !TELEFONO || !DNI) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // verificar que todas las id sean distintos
        // const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM clientes WHERE ID = :ID";
        // const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        // if (checkResult.rows[0][0] > 0) {
        //     return res.status(400).json({ error: "Ya existe un registro con este ID" });
        // }

        const sql = "INSERT INTO clientes (P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO,CORREO, TELEFONO, DNI) VALUES (:P_NOMBRE, :S_NOMBRE, :P_APELLIDO, :S_APELLIDO, :CORREO, :TELEFONO, :DNI)";
        console.log('Consulta SQL:', sql);
        const bindParams = [P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, CORREO, TELEFONO, DNI];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});


// actualizar un registro especifico segun el ID
router.put('/fromoracle/:ID', async (req, res) => {
    const { ID } = req.params;
    const { NOMBRE, APELLIDO, CORREO } = req.body;

    if (!NOMBRE || !APELLIDO || !CORREO) {
        return res.status(400).json({ error: "NOMBRE, APELLIDO y CORREO son campos requeridos" });
    }

    try {
        // Verificar si el DNI existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM personas WHERE ID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Actualizar el registro
        const updateQuery = "UPDATE personas SET NOMBRE = :NOMBRE, APELLIDO = :APELLIDO, CORREO = :CORREO WHERE ID = :ID";
        const bindParams = [NOMBRE, APELLIDO, CORREO, ID];

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