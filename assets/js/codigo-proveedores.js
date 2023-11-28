
var usuarioRegistrados = [
    {
        id: "1234567",
        nombre1: "Daniel",
        nombre2: "Alejandro",
        apellido1: "Avila",
        apellido2: "Varela", 
        email: "daniel.avila.a.v.2000@gmail.com",
        password: "12",
        phoneNumber: "123456789",
    },
    {
        id: "1111111",
        nombre1: "Kency",
        nombre2: "Pamela",
        apellido1: "Oseguera",
        apellido2: "Valdez", 
        email: "oseguera.2001@gmail.com",
        password: "11",
        phoneNumber: "987654",
    }
];


function mostrarProveedores(proveedores) {
    let tabla = '';
    for (let i = 0; i < proveedores.length; i++) {
        tabla += `<tr class="detalles-tabla" onclick="abrirVentanaModal()">
                    <td class="checkbox-tama">
                        <div class="checkbox-apple">
                            <input class="yep" id="check-apple-${i}" type="checkbox"> <!-- Hacer cada id único -->
                            <label for="check-apple-${i}"></label>
                        </div>
                    </td>
                    <td>${proveedores[i].id}</td>
                    <td><p>${proveedores[i].nombre1} ${proveedores[i].nombre2} ${proveedores[i].apellido1} ${proveedores[i].apellido2}</p></td>
                    <td>${proveedores[i].email}</td>
                    <td>${proveedores[i].phoneNumber}</td>
                </tr>`;
    }

    document.getElementById('seccion-proveedores').innerHTML = `
        <div class="card">
            <table border>
                <tr class="detalles-tabla">
                    <th></th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Número de teléfono</th>
                </tr>
                ${tabla}
            </table>
        </div>`;
}

function buscarProveedor() {
    const input = document.getElementById('buscador').value.toLowerCase();
    const resultados = usuarioRegistrados.filter(proveedor =>
        proveedor.id.toLowerCase().includes(input) ||
        proveedor.nombre1.toLowerCase().includes(input) ||
        proveedor.nombre2.toLowerCase().includes(input) ||
        proveedor.apellido1.toLowerCase().includes(input) ||
        proveedor.apellido2.toLowerCase().includes(input)
    );
    mostrarProveedores(resultados);
}

mostrarProveedores(usuarioRegistrados);




/*function mostrarProveedores(){
    let tabla = ``;

    for(let i=0; i<usuarioRegistrados.length; i++){

        tabla += ` <TR class="detalles-tabla" onclick="abrirVentanaModal()">
                    <TD class="checkbox-tama"><div class="checkbox-apple"><input class="yep" id="check-apple" type="checkbox"><label for="check-apple"></label></div></TD><TD>${usuarioRegistrados[i].id}</TD><TD><p>${usuarioRegistrados[i].nombre1} ${usuarioRegistrados[i].nombre2} ${usuarioRegistrados[i].apellido1} ${usuarioRegistrados[i].apellido2}</p></TD><TD>${usuarioRegistrados[i].email}</TD> <TD>${usuarioRegistrados[i].phoneNumber}</TD>
                </TR>`;                 
    }

    document.getElementById("seccion-proveedores").innerHTML = ` <div class="card">    
                                                                <TABLE BORDER>
                                                                    <TR class="detalles-tabla">
                                                                        <TH></TH><TH>ID</TH> <TH>Name</TH> <TH>Email</TH> <TH>Phone number</TH>
                                                                    </TR>
                                                                    ${tabla} 
                                                                </TABLE> 
                                                            </div>`;
}

mostrarProveedores();
*/




var miVentanaModal = document.getElementById("miVentanaModal");

// Abre la ventana modal
function abrirVentanaModal() {
  miVentanaModal.style.display = "block";
}

// Cierra la ventana modal cuando se hace clic afuera de ella
window.onclick = function(event) {
  if (event.target == miVentanaModal) {
    miVentanaModal.style.display = "none";
  }
}

// Cierra la ventana modal cuando se hace clic en el botón de cerrar
var botonCerrar = document.getElementsByClassName("cerrar")[0];
botonCerrar.onclick = function() {
  miVentanaModal.style.display = "none";
}
