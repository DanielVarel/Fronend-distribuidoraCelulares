const {Router} = require('express');
const router = Router();
const BD = require('../config/config');


router.get('/', (req,res)=> {
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros
router.get('/empleados', async (req, res) => {
    const empleados = [];
    sql="select empleadoID, dni, p_nombre, s_nombre, p_apellido, s_apellido, telefono, correo, "+
    "DEPARTAMENTO.nombre_departamento AS nom_departamento, CARGO.nombre_cargo AS nom_cargo, fechaIngreso, direccionID, "+
    "hora_entrada, hora_salida from EMPLEADO INNER JOIN DEPARTAMENTO on "+
    "DEPARTAMENTO.departamentoID = EMPLEADO.departamentoID "+
    "INNER JOIN CARGO ON EMPLEADO.cargoID = CARGO.cargoID";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(empleados);

    result.rows.map(emp=>{
        let userSchema = {
            "empleadoID": emp[0],
            "DNI": emp[1],
            "P_NOMBRE": emp[2],
            "S_NOMBRE": emp[3],
            "P_APELLIDO": emp[4],
            "S_APELLIDO": emp[5],
            "TELEFONO": emp[6],
            "CORREO": emp[7],
            "DEPARTAMENTO": emp[8],
            "CARGO": emp[9],
            "FECHA_INGRESO": emp[10],
            "DIRECCION": emp[11],
            "HORA_SALIDA": emp[12],
            "HORA_ENTRADA": emp[13]
        }
        empleados.push(userSchema)
    });
    res.json({empleados});
});


// devolver un registro con el id especifico
router.get('/empleados/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por ID
        const selectQuery = "SELECT * FROM empleado WHERE empleadoID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const emp = {
            "empleadoID":  result.rows[0][0],
            "DNI": result.rows[0][1],
            "P_NOMBRE": result.rows[0][2],
            "S_NOMBRE": result.rows[0][3],
            "P_APELLIDO": result.rows[0][4],
            "S_APELLIDO": result.rows[0][5],
            "TELEFONO": result.rows[0][6],
            "CORREO": result.rows[0][7],
            "DEPARTAMENTO": result.rows[0][8],
            "CARGO": result.rows[0][9],
            "FECHA_INGRESO": result.rows[0][10],
            "DIRECCION": result.rows[0][11],
            "HORA_ENTRADA": result.rows[0][12],
            "HORA_SALIDA": result.rows[0][13]

        };

        res.status(200).json({ emp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//insertar un nuevo registro
router.post('/empleados', async (req, res) => {
    const {empleadoID, DNI, P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, TELEFONO, CORREO, DEPARTAMENTOID, CARGOID, FECHA_INGRESO, HORA_ENTRADA, HORA_SALIDA} = req.body;

    console.log(req.body)

    if (!empleadoID ||!DNI || !P_NOMBRE || !S_NOMBRE ||  !P_APELLIDO || !S_APELLIDO || !TELEFONO || !CORREO || !DEPARTAMENTOID || !CARGOID || !FECHA_INGRESO || !HORA_ENTRADA || !HORA_SALIDA) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // verificar que todas las id sean distintos
        // const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM clientes WHERE ID = :ID";
        // const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        // if (checkResult.rows[0][0] > 0) {
        //     return res.status(400).json({ error: "Ya existe un registro con este ID" });
        // }

        const sql = "INSERT INTO empleado (empleadoID, DNI, P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, TELEFONO, CORREO, DEPARTAMENTOID, CARGOID, FECHA_INGRESO, HORA_ENTRADA, HORA_SALIDA) VALUES (:empleadoID,:DNI, :P_NOMBRE, :S_NOMBRE, :P_APELLIDO, :S_APELLIDO, :TELEFONO, :CORREO, :DEPARTAMENTOID, :CARGOID, :FECHA_INGRESO, :HORA_ENTRADA, :HORA_SALIDA)";
        console.log('Consulta SQL:', sql);
        const bindParams = [empleadoID, DNI, P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, TELEFONO, CORREO, DEPARTAMENTOID, CARGOID, FECHA_INGRESO, HORA_ENTRADA, HORA_SALIDA];

        let result = await BD.Open(sql, bindParams, true);
        console.log(result);

        res.status(201).json({ message: "Registro insertado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});


// actualizar un registro especifico segun el ID
router.put('/empleados/:ID', async (req, res) => {
    const { ID } = req.params;
    const { DNI, P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, TELEFONO, CORREO, DEPARTAMENTOID, CARGOID, FECHA_INGRESO, HORA_ENTRADA, HORA_SALIDA} = req.body;

    if (!DNI || !P_NOMBRE || !S_NOMBRE ||  !P_APELLIDO || !S_APELLIDO || !TELEFONO || !CORREO || !DEPARTAMENTOID || !CARGOID || !FECHA_INGRESO || !HORA_ENTRADA || !HORA_SALIDA) {
        return res.status(400).json({ error: "NOMBRE, APELLIDO y CORREO son campos requeridos" });
    }

    try {
        // Verificar si el DNI existe
        const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM EMPLEADO WHERE empleadoID = :ID";
        const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

        if (checkResult.rows[0][0] === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Actualizar el registro
        const updateQuery = "UPDATE empleado SET DNI = :DNI, P_NOMBRE = :P_NOMBRE, S_NOMBRE= :S_NOMBRE, P_APELLIDO=: P_APELLIDO, S_APELLIDO= :S_APELLIDO, TELEFONO = :TELEFONO, CORREO = :CORREO, DEPARTAMENTOID= DEPARTAMENTOID, CARGOID= :CARGOID, FECHA_INGRESO= :FECHA_INGRESO, HORA_ENTRADA = :HORA_ENTRADA, HORA_SALIDA= :HORA_SALIDA  WHERE empleadoID = :ID";
        const bindParams = [DNI, P_NOMBRE, S_NOMBRE, P_APELLIDO, S_APELLIDO, TELEFONO, CORREO, DEPARTAMENTOID, CARGOID, FECHA_INGRESO, HORA_ENTRADA, HORA_SALIDA, ID];

        let result = await BD.Open(updateQuery, bindParams, true);
        console.log(result);

        res.status(200).json({ message: "Registro actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el registro en la base de datos" });
    }
});

// // eliminar un registro segun el ID
// router.delete('/fromoracle/:ID', async (req, res) => {
//     const { ID } = req.params;

//     try {
//         // Verificar si el ID existe
//         const checkExistingDNIQuery = "SELECT COUNT(*) AS count FROM personas WHERE ID = :ID";
//         const checkResult = await BD.Open(checkExistingDNIQuery, [ID], false);

//         if (checkResult.rows[0][0] === 0) {
//             return res.status(404).json({ error: "No se encontró un registro con este ID" });
//         }

//         // Eliminar el registro
//         const deleteQuery = "DELETE FROM personas WHERE ID = :ID";
//         const bindParams = [ID];

//         let result = await BD.Open(deleteQuery, bindParams, true);
//         console.log(result);

//         res.status(200).json({ message: "Registro eliminado con éxito" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error al eliminar el registro de la base de datos" });
//     }
// });

module.exports = router;