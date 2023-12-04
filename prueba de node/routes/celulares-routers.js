const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/celulares', async (req, res) => {
    const celulares = [];
    sql="SELECT celulares.celularID,  celulares.nombre_celular, modelo.nombre_modelo, marca.nombre_marca, proveedor.nombre_proveedor, celulares.cantidad_ram, procesador.nombre_procesador, celulares.imei, celulares.camara_resolucion, celulares.almacenamiento, celulares.bateria, celulares.dimensionesid, celulares.peso, celulares.cantidad_sim, color.nombre_color, celulares.sku, celulares.existencia, so.nombre_so, celulares.precio  FROM celulares INNER JOIN modelo ON modelo.modeloid = celulares.modeloid INNER JOIN marca ON marca.marcaid = celulares.marcaid INNER JOIN proveedor ON proveedor.proveedorid = celulares.proveedorid INNER JOIN procesador ON procesador.procesadorid = celulares.procesadorid INNER JOIN color ON color.colorID = celulares.colorid INNER JOIN so ON so.soid = celulares.soid";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(celulares);

    result.rows.map(celular=>{
        let userSchema = {
            "CelularID": celular[0],
            "Nombre_celular": celular[1],
            "Modelo": celular[2],
            "Marca": celular[3],
            "proveedor": celular[4],
            "Cantidad_Ram": celular[5],
            "Procesador": celular[6],
            "EMEI": celular[7],
            "Resolucion_camara": celular[8],
            "Almacenamiento": celular[9],
            "Bateria": celular[10],
            "Dimensiones": celular[11],
            "Peso": celular[12],
            "Cantidad_sim": celular[13],
            "Color": celular[14],
            "SKU": celular[15],
            "EXISTENCIAS" : celular[16],
            "Sistema_Operativo": celular[17],
            "Precio": celular[18],    
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
    
    if ( !MODELOID || !NOMBRE_CELULAR || !MARCAID || !PRECIO || !PROVEEDORID || !CANTIDAD_RAM || !PROCESADORID || !IMEI || !CAMARA_RESOLUCION || !ALMACENAMIENTO || !BATERIA || !DIMENSIONESID || !PESO || !SOID || !CANTIDAD_SIM || !COLORID || !SKU || !EXISTENCIA) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    
    try {
        const sql = "INSERT INTO celulares (MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA) VALUES (:MODELOID, :NOMBRE_CELULAR, :MARCAID, :PRECIO, :PROVEEDORID, :CANTIDAD_RAM, :PROCESADORID, :IMEI, :CAMARA_RESOLUCION, :ALMACENAMIENTO, :BATERIA, :DIMENSIONESID, :PESO, :SOID, :CANTIDAD_SIM, :COLORID, :SKU, :EXISTENCIA)";
        console.log('Consulta SQL:', sql);
        const bindParams = [ MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA];

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
    const { MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA } = req.body;

    try {
        // Actualizar el registro
        const updateQuery = "UPDATE celulares SET MODELOID=:MODELOID, NOMBRE_CELULAR=:NOMBRE_CELULAR, MARCAID=:MARCAID, PRECIO=:PRECIO, PROVEEDORID=:PROVEEDORID, CANTIDAD_RAM=:CANTIDA_DRAM, PROCESADORID=:PROCESADORID, IMEI=:IMEI, CAMARA_RESOLUCION=:CAMARA_RESOLUCION, ALMACENAMIENTO=:ALMACENAMIENTO, BATERIA=:BATERIA, DIMENSIONESID=:DIMENSIONESID ,  PESO=:PESO, SOID=:SOID, CANTIDAD_SIM=:CANTIDAD_SIM, COLORID=:COLORID, SKU=:SKU, EXISTENCIA=:EXISTENCIA WHERE CELULARID= :ID"
        const bindParams = [MODELOID, NOMBRE_CELULAR, MARCAID, PRECIO, PROVEEDORID, CANTIDAD_RAM, PROCESADORID, IMEI, CAMARA_RESOLUCION, ALMACENAMIENTO, BATERIA, DIMENSIONESID, PESO, SOID, CANTIDAD_SIM, COLORID, SKU, EXISTENCIA];

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


module.exports = router;
