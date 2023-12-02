const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/departamento', async (req, res) => {
    const departamento = [];
    sql="select * from departamento";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(departamento);

    result.rows.map(depto=>{
        let userSchema = {
            "departamentoID": depto[0],
            "nombre_departamento": depto[1]
        }
        departamento.push(userSchema)
    });
    res.json({departamento});
});

// devolver un registro con el id especifico
router.get('/departamento/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM departamento WHERE departamentoID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const departamento = {
            "departamentoID": result.rows[0][0],
            "nombre_departamento": result.rows[0][1]
        };

        res.status(200).json({ departamento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//=================================================================================================
//insertar un nuevo registro
router.post('/departamento', async (req, res) => {
    const {departamentoID, nombre_departamento} = req.body;

    console.log(req.body)
    
    try {


        const sql = "INSERT INTO departamento (departamentoID, nombre_departamento) VALUES (:departamentoID, :nombre_departamento)";
        console.log('Consulta SQL:', sql);
        const bindParams = [departamentoID, nombre_departamento];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

//=================================================================================================
// actualizar un registro especifico segun el ID
router.put('/departamento/:ID', async (req, res) => {
    const { ID } = req.params;
    
    const {nombre_departamento} = req.body;



    try {
        // Actualizar el registro
        const updateQuery = "UPDATE departamento SET nombre_departamento=:nombre_departamento";
        // actualizar un registro especifico segun el ID
        router.put('/departamento/:ID', async (req, res) => {
            const { ID } = req.params;
            const {NOMBRE_CELULAR, PRECIO, EXISTENCIA } = req.body;
        
        
        
            try {
                // Actualizar el registro
                const updateQuery = "UPDATE celulares SET NOMBRE_CELULAR=:NOMBRE_CELULAR WHERE departamentoID= :ID"
                const bindParams = [nombre_departamento];
        
                let result = await BD.Open(updateQuery, bindParams, true);
                console.log(result);
        
                res.status(200).json({ message: "Registro actualizado con éxito" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
            }
        });
        const bindParams = [nombre_departamento, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

//=================================================================================================
// eliminar un registro segun el ID
router.delete('/departamento/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM departamento WHERE departamentoID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM departamento WHERE departamentoID = :ID";
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