
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
    }
];

//Agregado K
function mostrarEmpleados(empleados) {
  let tabla = '';
  for (let i = 0; i < empleados.length; i++) {
      tabla += `<tr class="detalles-tabla" onclick="abrirVentanaModal()">
                  <td class="checkbox-tama">
                      <div class="checkbox-apple">
                          <input class="yep" id="check-apple-${i}" type="checkbox"> <!-- Hacer cada id único -->
                          <label for="check-apple-${i}"></label>
                      </div>
                  </td>
                  <td>${empleados[i].id}</td>
                  <td><p>${empleados[i].nombre1} ${empleados[i].nombre2} ${empleados[i].apellido1} ${empleados[i].apellido2}</p></td>
                  <td>${empleados[i].email}</td>
                  <td>${empleados[i].phoneNumber}</td>
              </tr>`;
  }

  document.getElementById('seccion-empleados').innerHTML = `
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

function buscarEmpleado() {
  const input = document.getElementById('buscador').value.toLowerCase();
  const resultados = usuarioRegistrados.filter(empleado =>
      empleado.id.toLowerCase().includes(input) ||
      empleado.nombre1.toLowerCase().includes(input) ||
      empleado.nombre2.toLowerCase().includes(input) ||
      empleado.apellido1.toLowerCase().includes(input) ||
      empleado.apellido2.toLowerCase().includes(input)
  );
  mostrarEmpleados(resultados);
}

mostrarEmpleados(usuarioRegistrados);


//Fin agregado K


/*
function mostrarRepartidores(){
    let tabla = ``;

    for(let i=0; i<usuarioRegistrados.length; i++){

        tabla += ` <TR class="detalles-tabla" onclick="abrirVentanaModal()">
                    <TD class="checkbox-tama"><div class="checkbox-apple"><input class="yep" id="check-apple" type="checkbox"><label for="check-apple"></label></div></TD><TD>${usuarioRegistrados[i].id}</TD><TD><p>${usuarioRegistrados[i].nombre1} ${usuarioRegistrados[i].nombre2} ${usuarioRegistrados[i].apellido1} ${usuarioRegistrados[i].apellido2}</p></TD><TD>${usuarioRegistrados[i].email}</TD> <TD>${usuarioRegistrados[i].phoneNumber}</TD>
                 </TR>`;                 
    }

    document.getElementById("seccion-repartidores").innerHTML = ` <div class="card">    
                                                                <TABLE BORDER>
                                                                    <TR class="detalles-tabla">
                                                                        <TH></TH><TH>ID</TH> <TH>Name</TH> <TH>Email</TH> <TH>Phone number</TH>
                                                                    </TR>
                                                                    ${tabla} 
                                                                </TABLE> 
                                                            </div>`;
}

mostrarRepartidores();
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
