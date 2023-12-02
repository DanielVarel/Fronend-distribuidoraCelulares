const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/direccion', async (req, res) => {
    const direccion = [];
    sql="select * from direccion";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(direccion);

    result.rows.map(Direccion=>{
        let userSchema = {
            "direccionID": Direccion[0],
            "colonia": Direccion[1],
            "calle": Direccion[2],
            "avenida": Direccion[3],
            "bloque": Direccion[4],
            "sector": Direccion[5]
        }
        direccion.push(userSchema)
    });
    res.json({direccion});
});

// devolver un registro con el id especifico
router.get('/direccion/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM direccion WHERE direccionID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const direccion = {
            "direccionID": result.rows[0][0],
            "colonia": result.rows[0][1],
            "calle": result.rows[0][2],
            "avenida": result.rows[0][3],
            "bloque": result.rows[0][4],
            "sector": result.rows[0][5]
        };

        res.status(200).json({ direccion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/direccion', async (req, res) => {
    const {direccionID, colonia, calle, avenida, bloque, sector } = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO direccion (direccionID, colonia, calle, avenida, bloque, sector) VALUES (:direccionID, :colonia, :calle, :avenida, :bloque, :sector)";
        console.log('Consulta SQL:', sql);
        const bindParams = [direccionID, colonia, calle, avenida, bloque, sector];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// actualizar un registro especifico segun el ID
router.put('/direccion/:ID', async (req, res) => {
    const { ID } = req.params;
    const { colonia, calle, avenida, bloque, sector} = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE direccion SET colonia=:colonia, calle =:calle, avenida =:avenida,bloque = :bloque, sector = :sector WHERE direccionID= :ID"
        const bindParams = [ colonia, calle, avenida, bloque, sector, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/direccion/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM direccion WHERE direccionID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM direccion WHERE direccionID = :ID";
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