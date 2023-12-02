const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/garantias', async (req, res) => {
    const garantias = [];
    sql="select * from garantia";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(garantias);

    result.rows.map(garan=>{
        let userSchema = {
            "ID": garan[0],
            "celular": garan[1],
            "tiempoGarantia": garan[2],
            "estadoGarantia": garan[3]
        }
        garantias.push(userSchema)
    });
    res.json({garantias});
});


// devolver un registro con el id especifico
router.get('/garantias/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por DNI
        const selectQuery = "SELECT * FROM garantia WHERE GARANTIAID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const garanti = {
            "ID":  result.rows[0][0],
            "celular": result.rows[0][1],
            "tiempoGarantia": result.rows[0][2],
            "estadoGarantia": result.rows[0][3]
        
        };

        res.status(200).json({ garanti });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/garantias', async (req, res) => {
    const {ID, celularID, tiempoGarantiaID ,  estadoGarantiaID } = req.body;

    console.log(req.body)

    if (!celularID || !tiempoGarantiaID ||  !estadoGarantiaID ) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // verificar que todas las id sean distintos
        // const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM clientes WHERE ID = :ID";
        // const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        // if (checkResult.rows[0][0] > 0) {
        //     return res.status(400).json({ error: "Ya existe un registro con este ID" });
        // }

        const sql = "INSERT INTO garantia (celularID , tiempoGarantiaID,  estadoGarantiaID) VALUES (:celularID , :tiempoGarantiaID,  :estadoGarantiaID)";
        console.log('Consulta SQL:', sql);
        const bindParams = [celularID , tiempoGarantiaID,  estadoGarantiaID];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});


// actualizar un registro especifico segun el ID
router.put('/garantias/:ID', async (req, res) => {
    const { ID } = req.params;
    const {celularID , tiempoGarantiaID,  estadoGarantiaID } = req.body;

    if (!celularID || !tiempoGarantiaID ||  !estadoGarantiaID) {
        return res.status(400).json({ error: "NOMBRE, APELLIDO y CORREO son campos requeridos" });
    }

    try {
        // Verificar si el DNI existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM garantia WHERE ID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Actualizar el registro
        const updateQuery = "UPDATE garantia SET tiempoGarantia = :tiempogaratiaID, estadoGarantia = :estadoGarantiaID WHERE ID = :ID";
        const bindParams = [celularID , tiempoGarantiaID,  estadoGarantiaID, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// // eliminar un registro segun el ID
// router.delete('/garantias/:ID', async (req, res) => {
//     const { ID } = req.params;

//     try {
//         // Verificar si el ID existe
//         const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM garantia WHERE ID = :ID";
//         const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

//         if (checkResult.rows[0][0] === 0) {
//             return res.status(404).json({ error: "No se encontró un registro con este ID" });
//         }

//         // Eliminar el registro
//         const deleteQuery = "DELETE FROM garantia WHERE ID = :ID";
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