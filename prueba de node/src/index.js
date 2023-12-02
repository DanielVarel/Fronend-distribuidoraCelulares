const express =  require("express");
const  morgan = require("morgan");
const cors = require("cors");
const app = express();

const router = require("../routes/routes.js");
const clientes = require("../routes/clientes-routers.js");
const celulares = require("../routes/celulares-routers.js");
const marcas = require("../routes/marca-routers.js");


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

app.listen(app.get('port'), ()=>{
    console.log("server status on port en 3000");
});

