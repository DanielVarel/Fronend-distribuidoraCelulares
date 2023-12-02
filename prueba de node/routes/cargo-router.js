const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/cargo', async (req, res) => {
    const cargos = [];
    sql="select * from cargo";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(cargos);

    result.rows.map(cargo=>{
        let userSchema = {
            "cargoID": cargo[0],
            "nombre_cargo": cargo[1],
            "sueldo": cargo[2]
        }
        cargos.push(userSchema)
    });
    res.json({cargos});
});

// devolver un registro con el id especifico
router.get('/cargo/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM cargo WHERE cargoID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const cargo = {
            "cargoID": result.rows[0][0],
            "nombre_cargo": result.rows[0][1],
            "sueldo": result.rows[0][2]
        };

        res.status(200).json({ cargo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/cargo', async (req, res) => {
    const {cargoID, nombre_cargo, sueldo } = req.body;

    console.log(req.body)
    
    try {


        const sql = "INSERT INTO cargo (cargoID, nombre_cargo, sueldo) VALUES (:cargoID, :nombre_cargo, :sueldo)";
        console.log('Consulta SQL:', sql);
        const bindParams = [cargoID, nombre_cargo, sueldo];

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
    const {nombre_cargo, sueldo} = req.body;



    try {
        // Actualizar el registro
        const updateQuery = "UPDATE cargo SET nombre_cargo=:nombre_cargo, sueldo=:sueldo WHERE cargoID= :ID"
        const bindParams = [nombre_cargo, sueldo, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// eliminar un registro segun el ID
router.delete('/cargo/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM cargo WHERE cargoID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM cargo WHERE cargoID = :ID";
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