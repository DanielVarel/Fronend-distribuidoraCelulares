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
















//****************************************************************************************** */
//****************************************************************************************** */
//CELULARES     CELULARES     CELULARES     CELULARES     CELULARES     CELULARES
//****************************************************************************************** */
// devolver todos los registros de celulares
router.get('/celulares', async (req, res) => {
    const celulares = [];
    sql="select * from celulares";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(celulares);

    result.rows.map(celular=>{
        let userSchema = {
            "CelularID": celular[0],
            "Modelo": celular[1],
            "Nombre_celular": celular[2],
            "Marca": celular[3],
            "Precio": celular[4],
            "proveedor": celular[5],
            "Cantidad_Ram": celular[6],
            "Procesador": celular[7],
            "EMEI": celular[8], 
            "Resolucion_camara": celular[9],
            "Almacenamiento": celular[10],
            "Bateria": celular[11],
            "Dimenciones": celular[12],
            "Peso": celular[13],
            "Sistema_Operativo": celular[14],
            "Color": celular[15],
            "SKU": celular[16],
        }
        celulares.push(userSchema)
    });
    res.json({celulares});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/celulares/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM celulares WHERE CELULARID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const celular = {
            "CelularID": result.rows[0][0],
            "Modelo": result.rows[0][1],
            "Nombre_celular": result.rows[0][2],
            "Marca": result.rows[0][3],
            "Precio": result.rows[0][4],
            "proveedor": result.rows[0][5],
            "Cantidad_Ram": result.rows[0][6],
            "Procesador": result.rows[0][7],
            "EMEI": result.rows[0][8], 
            "Resolucion_camara": result.rows[0][9],
            "Almacenamiento": result.rows[0][10],
            "Bateria": result.rows[0][11],
            "Dimenciones": result.rows[0][12],
            "Peso": result.rows[0][13],
            "Sistema_Operativo": result.rows[0][14],
            "cantidad_sim": result.rows[0][15],
            "Color": result.rows[0][16],
            "SKU": result.rows[0][17],
            "Existencia": result.rows[0][18]
        };

        res.status(200).json({ celular });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/celulares', async (req, res) => {
    const {CELULARID, MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA } = req.body;

    console.log(req.body)
    
    try {


        const sql = "INSERT INTO celulares (CELULARID, MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA) VALUES (:CELULARID, :MODELOID, :NOMBRE_CELULAR, :MARCAID, :PRECIO, :PROVEEDORID, :CANTIDAD_RAM, :PROCESADORID, :IMEI, :CAMARA_RESOLUCION, :ALMACENAMIENTO, :BATERIA, :DIMENSIONESID, :PESO, :SOID, :CANTIDAD_SIM, :COLORID, :SKU, :EXISTENCIA)";
        console.log('Consulta SQL:', sql);
        const bindParams = [CELULARID, MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA];

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
router.put('/celulares/:ID', async (req, res) => {
    const { ID } = req.params;
    //const {CELULARID, MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA } = req.body;
    const {NOMBRE_CELULAR, PRECIO, EXISTENCIA } = req.body;



    try {
        // Actualizar el registro
        const updateQuery = "UPDATE celulares SET NOMBRE_CELULAR=:NOMBRE_CELULAR, PRECIO=:PRECIO, EXISTENCIA=:EXISTENCIA WHERE CELULARID= :ID"
        const bindParams = [NOMBRE_CELULAR, PRECIO, EXISTENCIA, ID];

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
router.delete('/celulares/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Verificar si el ID existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM celulares WHERE celularID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Eliminar el registro
        const deleteQuery = "DELETE FROM celulares WHERE celularID = :ID";
        const bindParams = [ID];

        let result = await BD.Open(deleteQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
    }
});
//****************************************************************************************** */
//CELULARES     CELULARES     CELULARES     CELULARES     CELULARES     CELULARES
//****************************************************************************************** */
//****************************************************************************************** */











module.exports = router;

