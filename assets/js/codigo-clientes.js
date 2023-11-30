
var usuarioRegistrados = [
    {
        id: "1234567",
        name: "Daniel Avila", 
        email: "daniel.avila.a.v.2000@gmail.com",
        password: "12",
        phoneNumber: "123456789",
        verificado: true 
    }
];


//Agregado K


// Función para mostrar los clientes en la tabla
function mostrarClientes(clientes) {
    let tabla = '';
    for (let i = 0; i < clientes.length; i++) {
        tabla += `<tr class="detalles-tabla" onclick="abrirVentanaModal(${i})">
                    <td class="checkbox-tama">
                        <div class="checkbox-apple">
                            <input class="yep" id="check-apple-${i}" type="checkbox">
                            <label for="check-apple-${i}"></label>
                        </div>
                    </td>
                    <td>${clientes[i].id}</td>
                    <td><p>${clientes[i].name}</p></td>
                    <td>${clientes[i].email}</td>
                    <td>${clientes[i].phoneNumber}</td>
                    <td>
                    <button style="width=100px" onclick="eliminarUsuario(${i})">Eliminar</button>
                    </td>
                </tr>`;
    }

    document.getElementById('seccion-clientes').innerHTML = `
        <div class="card">
            <table border>
                <tr class="detalles-tabla">
                    <th></th>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Número de teléfono</th>
                    <th>Acciones</th>
                </tr>
                ${tabla}
            </table>
        </div>`;
}

// Función para agregar un nuevo cliente
function agregarCliente() {
    const nuevoId = document.getElementById('identidad').value;

    // Verificar si ya existe un cliente con el mismo ID 
    const clienteExistente = usuarioRegistrados.find(cliente =>
        cliente.id === nuevoId 
    );

    if (clienteExistente) {
        alert('Ya existe un cliente con el mismo ID.');
        return;
    }

    const nuevoCliente = {
        id: nuevoId,
        name: document.getElementById('p_nombre').value + ' ' + document.getElementById('s_nombre').value + ' ' +
            document.getElementById('p_apellido').value + ' ' + document.getElementById('s_apellido').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('telefono').value
    };
    
    usuarioRegistrados.push(nuevoCliente);

    mostrarClientes(usuarioRegistrados);
    
    // Limpiar los campos del formulario
    document.getElementById('formularioClientes').reset();
}

function eliminarUsuario(index) {
    usuarioRegistrados.splice(index, 1);
    mostrarClientes(usuarioRegistrados);
}


// Función para eliminar un cliente
function eliminarCliente(index) {
    usuarioRegistrados.splice(index, 1);
    mostrarClientes(usuarioRegistrados);
}

// Función para buscar un cliente por ID o nombre
function buscarCliente() {
    const input = document.getElementById('buscador').value.toLowerCase();
    const resultados = usuarioRegistrados.filter(cliente =>
        cliente.id.toLowerCase().includes(input) ||
        cliente.name.toLowerCase().includes(input)
    );
    mostrarClientes(resultados);
}

// Variable para almacenar el índice del cliente seleccionado
let clienteSeleccionadoIndex = null;

// Función para mostrar los detalles del cliente en el modal
function abrirVentanaModal(index) {
  clienteSeleccionadoIndex = index;
  const cliente = usuarioRegistrados[index];

  document.querySelector("#miVentanaModal .modal-inf").innerHTML = `
    <p><i class="fa-solid fa-id-card-clip"></i> ${cliente.id}</p>
    <p><i class="fa-solid fa-user"></i> ${cliente.name}</p>
    <p><i class="fa-solid fa-envelope"></i> ${cliente.email}</p>
    <p><i class="fa-solid fa-phone"></i> ${cliente.phoneNumber}</p>
  `;

  miVentanaModal.style.display = "block";
}




// Mostrar clientes al cargar la página
mostrarClientes(usuarioRegistrados);


///////

//Fin agregado K



/*
function mostrarRepartidores(){
    let tabla = ``;
    let verificado = true;

    for(let i=0; i<usuarioRegistrados.length; i++){

        tabla += ` <TR class="detalles-tabla" onclick="abrirVentanaModal()">
                    <TD class="checkbox-tama"><div class="checkbox-apple"><input class="yep" id="check-apple" type="checkbox"><label for="check-apple"></label></div></TD><TD>${usuarioRegistrados[i].id}</TD><TD><p>${usuarioRegistrados[i].name}</p></TD><TD>${usuarioRegistrados[i].email}</TD> <TD>${usuarioRegistrados[i].phoneNumber}</TD><TD class="botones" id="botones"><i class="fa-solid fa-check"></i></TD>
                 </TR>`;                 
    }

    document.getElementById("seccion-repartidores").innerHTML = ` <div class="card">    
                                                                <TABLE BORDER>
                                                                    <TR class="detalles-tabla">
                                                                        <TH></TH><TH>ID</TH> <TH>Name</TH> <TH>Email</TH> <TH>Phone number</TH> <TH>Verified</TH>
                                                                    </TR>
                                                                    ${tabla} 
                                                                </TABLE> 
                                                            </div>`;
}

mostrarRepartidores();
*/


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
