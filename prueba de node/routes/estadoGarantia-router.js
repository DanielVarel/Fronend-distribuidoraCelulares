const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/estadoGarantia', async (req, res) => {
    const estado = [];
    sql="select * from estado_garantia";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(estado);

    result.rows.map(estadoGarantia=>{
        let userSchema = {
            "estadoGarantiaID": estadoGarantia[0],
            "descripcion": estadoGarantia[1]
        }
        estado.push(userSchema)
    });
    res.json({pais});
});

// devolver un registro con el id especifico
router.get('/estadosGarantia/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM estado_garantoa WHERE estadoGarantiaID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const estadoG = {
            "estadoGarantiaID": result.rows[0][0],
            "descripcion": result.rows[0][1]
        };

        res.status(200).json({ estadoG });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});


module.exports = router;
//igual no creo que se deba de ingresar los estados de la garantia 
//en mi opinion debe de ser directo desde la BD

module.exports = router;
