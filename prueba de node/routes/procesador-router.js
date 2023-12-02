const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/procesadores', async (req, res) => {
    const procesador = [];
    sql="select * from procesador";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(procesador);

    result.rows.map(Procesador=>{
        let userSchema = {
            "procesadorID": Procesador[0],
            "nombre_procesador": Procesador[1]
        }
        procesador.push(userSchema)
    });
    res.json({procesador});
});

// devolver un registro con el id especifico
router.get('/procesador/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM procesador WHERE procesadorID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const procesador = {
            "procesadorID": result.rows[0][0],
            "nombre_procesador": result.rows[0][1]
        };

        res.status(200).json({ procesador });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/procesador', async (req, res) => {
    const {procesadorID, nombre_procesador } = req.body;

    console.log(req.body)
    
    try {

        const sql = "INSERT INTO procesador (procesadorID, nombre_procesador) VALUES (:procesadorID, :nombre_procesador)";
        console.log('Consulta SQL:', sql);
        const bindParams = [procesadorID, nombre_procesador];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// actualizar un registro especifico segun el ID
router.put('/procesador/:ID', async (req, res) => {
    const { ID } = req.params;
    const {nombre_procesador} = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE procesador SET nombre_procesador=:nombre_procesador WHERE procesadorID= :ID"
        const bindParams = [nombre_procesador, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/procesador/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM procesador WHERE procesadorID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM procesador WHERE procesadorID = :ID";
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