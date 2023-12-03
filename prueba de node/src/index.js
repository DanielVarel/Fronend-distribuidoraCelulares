const express =  require("express");
const  morgan = require("morgan");
const cors = require("cors");
const app = express();

const router = require("../routes/routes.js");
const clientes = require("../routes/clientes-routers.js");
const celulares = require("../routes/celulares-routers.js");
const marcas = require("../routes/marca-routers.js");
const modelos = require("../routes/modelo-routers.js");
const direccion = require("../routes/direccion-routers.js");
const cargo = require("../routes/cargo-router.js");
const color = require("../routes/color-router.js");
const departamento = require("../routes/departamento-router.js");
const detallesVenta = require("../routes/detalleVenta-routers.js");
const dimensiones = require("../routes/dimensiones-router.js");
const empleados = require("../routes/empleados-routes.js");
const estadoGarantia = require("../routes/estadoGarantia-router.js")

const garantias = require("../routes/garantia-routes.js");
const pais = require("../routes/pais-route.js");
const procesador = require("../routes/procesador-router.js");
const proveedores = require("../routes/proveedor-routers.js");
const so = require("../routes/so-routers.js");
const tiempoGarantia = require("../routes/tiempoGarantia-route.js");
const tipoPago = require("../routes/tipoPago-router.js");
const ventas = require("../routes/venta-routers.js");

const compra = require("../routes/compra-routers.js");
const factura = require("../routes/factura-routers.js");
const devolucion = require("../routes/devolucion-routers.js")
const detalleDevolucion = require("../routes/detalleDevolucion-routers.js")
const detalleCompra = require("../routes/detalleCompra-routers.js")


/**Configuraciones**/
app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use(router)
app.use(clientes)
app.use(celulares)
app.use(marcas)
app.use(modelos)
app.use(direccion)
app.use(color)
app.use(cargo)
app.use(departamento)
app.use(detallesVenta)
app.use(dimensiones)
app.use(empleados)
app.use(estadoGarantia)
app.use(tipoPago)
app.use(garantias)
app.use(pais)
app.use(procesador)
app.use(proveedores)
app.use(so)
app.use(tiempoGarantia)
app.use(ventas)
app.use(compra)
app.use(detalleCompra)
app.use(factura)
app.use(devolucion)
app.use(detalleDevolucion)

app.listen(app.get('port'), ()=>{
    console.log("server status on port en 3000");
});

