const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/tiempoGarantia', async (req, res) => {
    const tiempoGarantia = [];
    sql="select * from tiempo_garantia";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(tiempoGarantia);

    result.rows.map(tG=>{
        let userSchema = {
            "tiempoGarantiaID": tG[0],
            "tiempo": tG[1]
        }
        tiempoGarantia.push(userSchema)
    });
    res.json({tiempoGarantia});
});

// devolver un registro con el id especifico
router.get('/tiempoGarania/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM tiempo_garantia WHERE tiempoGarantiaID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const tg = {
            "tiempoGarantiaID": result.rows[0][0],
            "tiempo": result.rows[0][1]
        };

        res.status(200).json({ tg });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/TiempoGarantia', async (req, res) => {
    const {tiempoGarantiaID, tiempo } = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO tiempo_garantia (tiempoGarantiaID, tiempo) VALUES (:tiempoGarantiaID, :tiempo)";
        console.log('Consulta SQL:', sql);
        const bindParams = [tiempoGarantiaID, tiempo];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// actualizar un registro especifico segun el ID
router.put('/tiempoGarantia/:ID', async (req, res) => {
    const { ID } = req.params;
    const {tiempo} = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE tiempo_garantia SET tiempo=:tiempo WHERE tiempoGarantiaID= :ID"
        const bindParams = [tiempo, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/tiempoGarantia/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM tiempo_garantia WHERE tiempoGarantiaID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM tiempo_garantia WHERE tiempoGarantiaID = :ID";
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