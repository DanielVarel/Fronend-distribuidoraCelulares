const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/fromoracle', async (req, res) => {
    const personas = [];
    sql="select * from personas";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(personas);

    result.rows.map(person=>{
        let userSchema = {
            "ID": person[0],
            "NOMBRE": person[1],
            "APELLIDO": person[2],
            "CORREO": person[3]
        }
        personas.push(userSchema)
    });
    res.json({personas});
});

// devolver un registro con el id especifico
router.get('/fromoracle/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por DNI
        const selectQuery = "SELECT * FROM personas WHERE ID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const person = {
            "ID": result.rows[0][0],
            "NOMBRE": result.rows[0][1],
            "APELLIDO": result.rows[0][2],
            "CORREO": result.rows[0][3]
        };

        res.status(200).json({ person });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/fromoracle', async (req, res) => {
    const { ID, NOMBRE, APELLIDO, CORREO } = req.body;

    console.log(req.body)

    if (!ID || !NOMBRE || !APELLIDO || !CORREO) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {

        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM personas WHERE ID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] > 0) {
            return res.status(400).json({ error: "Ya existe un registro con este ID" });
        }

        const sql = "INSERT INTO personas (ID, NOMBRE, APELLIDO, CORREO) VALUES (:ID, :NOMBRE, :APELLIDO, :CORREO)";
        console.log('Consulta SQL:', sql);
        const bindParams = [ID, NOMBRE, APELLIDO, CORREO];

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

// eliminar un registro segun el ID
router.delete('/fromoracle/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM personas WHERE ID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM personas WHERE ID = :ID";
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

