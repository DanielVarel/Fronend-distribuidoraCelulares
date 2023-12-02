const {Router} = require('express');
const router = Router();
const BD = require('../config/config');

router.get('/', (req,res)=>{
    res.status(200).json({
        message: "este mensaje es desde el servidor"
    })
});

// devolver todos los registros de celulares
router.get('/tipoPago', async (req, res) => {
    const tipoPago = [];
    sql="select * from tipo_pago";

    let result = await BD.Open(sql,[],false);
    console.log(result.rows);
    
    console.log(tipoPago);

    result.rows.map(tPago=>{
        let userSchema = {
            "tipoPagoID": tPago[0],
            "metodoPago": tPago[1]
        }
        tipoPago.push(userSchema)
    });
    res.json({pais});
});

// devolver un registro con el id especifico
router.get('/tipoPago/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        // Consultar el registro por celularID
        const selectQuery = "SELECT * FROM tipo_pago WHERE tipoPagoID = :ID";
        const result = await BD.Open(selectQuery, [ID], false);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontró un registro con este ID" });
        }

        // Mapear el resultado y enviarlo como respuesta
        const tipoPago = {
            "tipoPagoID": result.rows[0][0],
            "metodoPago": result.rows[0][1]
        };

        res.status(200).json({ tipoPago });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al recuperar el registro de la base de datos" });
    }
});

//no creo que se deba de crear metodos de pago
//deberian de ser agregados directamente en la tabla
//por eso solo mostramos todos los metodos y un metodo en especifico (por ID)