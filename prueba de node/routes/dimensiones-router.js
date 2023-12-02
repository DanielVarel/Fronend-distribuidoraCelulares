const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/dimensiones', async (req, res) => {
    const dimensiones = [];
    sql="select * from dimensiones";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(dimensiones);

    result.rows.map(Dimensiones=>{
        let userSchema = {
            "dimensionesID": Dimensiones[0],
            "ancho": Dimensiones[1],
            "alto": Dimensiones[2],
            "grosor": Dimensiones[3]
        }
        dimensiones.push(userSchema)
    });
    res.json({pais});
});

// devolver un registro con el id especifico
router.get('/dimensiones/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM dimensiones WHERE dimensionesID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const dimensiones = {
            "dimensionesID": result.rows[0][0],
            "ancho": result.rows[0][1],
            "alto": result.rows[0][2],
            "grosor": result.rows[0][3],
        };

        res.status(200).json({ dimensiones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/dimensiones', async (req, res) => {
    const {dimensionesID, ancho, alto, grosor } = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO dimensiones (dimensionesID, ancho, alto, grosor) VALUES (:dimensionesID, :ancho, :alto, :grosor)";
        console.log('Consulta SQL:', sql);
        const bindParams = [dimensionesID, ancho, alto, grosor];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// actualizar un registro especifico segun el ID
router.put('/dimensiones/:ID', async (req, res) => {
    const { ID } = req.params;
    const {ancho, alto, grosor} = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE dimensiones SET ancho=:ancho, alto=:alto, grosor=:grosor  WHERE dimensionesID= :ID"
        const bindParams = [ancho, alto, grosor, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/dimensiones/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM dimensiones WHERE dimensionesID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM dimensiones WHERE dimensionesID = :ID";
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