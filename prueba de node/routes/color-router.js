const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/color', async (req, res) => {
    const color = [];
    sql="select * from color";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(color);

    result.rows.map(Color=>{
        let userSchema = {
            "colorID": Color[0],
            "nombre_color": Color[1]
        }
        color.push(userSchema)
    });
    res.json({pais});
});

// devolver un registro con el id especifico
router.get('/color/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM color WHERE colorID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const color = {
            "colorID": result.rows[0][0],
            "nombre_color": result.rows[0][1]
        };

        res.status(200).json({ color });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/color', async (req, res) => {
    const {colorID, nombre_color } = req.body;

    console.log(req.body)
    
    try {


        const sql = "INSERT INTO color (colorID, nombre_color) VALUES (:colorID, :nombre_color)";
        console.log('Consulta SQL:', sql);
        const bindParams = [colorID, nombre_color];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// actualizar un registro especifico segun el ID
router.put('/color/:ID', async (req, res) => {
    const { ID } = req.params;
    const {nombre_color} = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE color SET nombre_color=:nombre_color WHERE colorID= :ID"
        const bindParams = [nombre_color, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/color/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM color WHERE colorID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM color WHERE colorID = :ID";
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