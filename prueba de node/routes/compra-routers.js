const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de compras
router.get('/compras', async (req, res) => {
    const compras = [];
    sql="SELECT compraid, p_nombre, p_apellido, nombre_proveedor, compra.fechacompra, tipo_pago.metodo_pago FROM ADMINISTRADOR.COMPRA INNER JOIN ADMINISTRADOR.PROVEEDOR ON compra.proveedorid=proveedor.proveedorid INNER JOIN ADMINISTRADOR.TIPO_PAGO ON tipo_pago.tipopagoid = compra.tipopagoid INNER JOIN ADMINISTRADOR.EMPLEADO ON empleado.empleadoid = compra.empleadoid order by compraid desc";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(compras);

    result.rows.map(compra=>{
        let userSchema = {
            "COMPRAID": compra[0],
            "EMPLEADOID": `${compra[1]} ${compra[2]}` ,
            "PROVEEDORID": compra[3],
            "FECHACOMPRA": compra[4],
            "TIPOPAGOID": compra[5]
        }
        compras.push(userSchema)
    });
    res.json({compras});
});



//=================================================================================================
// devolver un registro con el id especifico
router.get('/compras/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Mapear el resultado y enviarlo como respuesta
        const sql = "SELECT * FROM administrador.COMPRA WHERE COMPRAID = :ID"; 
        const result = await BD.Open(sql, [ID], false);

        const compra = {
            "COMPRAID": result.rows[0][0],
            "EMPLEADOID": result.rows[0][1],
            "PROVEEDORID": result.rows[0][2],
            "FECHACOMPRA": result.rows[0][3],
            "TIPOPAGOID": result.rows[0][4]
        };

        res.status(200).json({ compra });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});



//=================================================================================================
//insertar un nuevo registro
router.post('/compras', async (req, res) => {
    const {EMPLEADOID, PROVEEDORID, FECHACOMPRA, TIPOPAGOID} = req.body;

    console.log(req.body)
    
    try {
        const sql = "INSERT INTO administrador.compra ( EMPLEADOID, PROVEEDORID, FECHACOMPRA, TIPOPAGOID) VALUES (:EMPLEADOID, :PROVEEDORID, :FECHACOMPRA, :TIPOPAGOID)";
        console.log('Consulta SQL:', sql);
        const bindParams = [EMPLEADOID, PROVEEDORID, FECHACOMPRA, TIPOPAGOID];

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
router.put('/compras/:ID', async (req, res) => {
    const { ID } = req.params;
    const {EMPLEADOID, PROVEEDORID, FECHACOMPRA, TIPOPAGOID } = req.body;


    try {
        // Actualizar el registro
        const updateQuery = "UPDATE administrador.COMPRA SET EMPLEADOID=:EMPLEADOID, PROVEEDORID=:PROVEEDORID, FECHACOMPRA=:FECHACOMPRA, TIPOPAGOID=:TIPOPAGOID WHERE COMPRAID = :ID"
        const bindParams = [EMPLEADOID, PROVEEDORID, FECHACOMPRA, TIPOPAGOID, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});



// eliminar un registro segun el ID
router.delete('/compras/:ID', async (req, res) => {
    const { ID } = req.params;

    try {

        // Eliminar el registro
        const deleteQuery = "DELETE FROM administrador.COMPRA WHERE COMPRAID = :ID";
        const bindParams = [ID];

        let result = await BD.Open(deleteQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
    }
});


//==================================================================================
router.get('/empleadosParaSelect', async (req, res) => {
    try {
        const sql = "SELECT empleadoID, p_nombre, p_apellido FROM administrador.EMPLEADO";
        const result = await BD.Open(sql, [], false);

        const empleados = result.rows.map(emp => ({
            empleadoID: emp[0],
            nombreCompleto: `${emp[1]} ${emp[2]}` // Concatenar primer nombre y primer apellido
        }));

        res.status(200).json({ empleados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos de empleados" });
    }
});
//=========================================================
router.get('/proveedoresParaSelect', async (req, res) => {
    try {
        const sql = "SELECT * FROM administrador.proveedor";
        const result = await BD.Open(sql, [], false);

        const proveedores = result.rows.map(prove => ({
            ID: prove[0],
            NombreProveedor: prove[1],
        }));

        res.status(200).json({ proveedores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos de proveedores" });
    }
});
//=============================================
router.get('/tipoPagoParaSelect', async (req, res) => {
    try {
        const sql = "SELECT * FROM administrador.tipo_pago";
        const result = await BD.Open(sql, [], false);

        const tipoPago = result.rows.map(tPago => ({
            tipoPagoID: tPago[0],
            metodoPago: tPago[1]
        }));

        res.status(200).json({ tipoPago });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos de tipo de pago" });
    }
});



module.exports = router;
