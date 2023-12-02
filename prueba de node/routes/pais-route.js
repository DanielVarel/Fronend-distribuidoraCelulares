const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/pais', async (req, res) => {
    const pais = [];
    sql="select * from pais";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(pais);

    result.rows.map(Pais=>{
        let userSchema = {
            "paisID": Pais[0],
            "nombre_pais": Pais[1]
        }
        pais.push(userSchema)
    });
    res.json({pais});
});

// devolver un registro con el id especifico
router.get('/pais/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM pais WHERE paisID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const pais = {
            "paisID": result.rows[0][0],
            "nombre_pais": result.rows[0][1]
        };

        res.status(200).json({ pais });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/pais', async (req, res) => {
    const {paisID, nombre_pais } = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO pais (paisID, nombre_pais) VALUES (:paisID, :nombre_pais)";
        console.log('Consulta SQL:', sql);
        const bindParams = [paisID, nombre_pais];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// actualizar un registro especifico segun el ID
router.put('/cargo/:ID', async (req, res) => {
    const { ID } = req.params;
    const {nombre_pais} = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE pais SET nombre_pais=:nombre_pais WHERE paisID= :ID"
        const bindParams = [nombre_pais, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/pais/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM pais WHERE paisID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM pais WHERE paisID = :ID";
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