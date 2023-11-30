
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
        tabla += `<tr class="detalles-tabla" onclick="abrirVentanaModal()">
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
                </tr>
                ${tabla}
            </table>
        </div>`;
}

// Función para agregar un nuevo cliente
function agregarCliente() {
    const nuevoId = document.getElementById('identidad').value;

    // Verificar si ya existe un cliente con el mismo ID o correo electrónico
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




/*
// Función para editar un cliente existente
function editarCliente(index) {
    const cliente = usuarioRegistrados[index];
    document.getElementById('identidad').value = cliente.id;
    // Separar el nombre completo
    const nombreCompleto = cliente.name.split(' ');
    document.getElementById('p_nombre').value = nombreCompleto[0] || '';
    document.getElementById('s_nombre').value = nombreCompleto[1] || '';
    document.getElementById('p_apellido').value = nombreCompleto[2] || '';
    document.getElementById('s_apellido').value = nombreCompleto[3] || '';
    document.getElementById('email').value = cliente.email;
    document.getElementById('telefono').value = cliente.phoneNumber;

    // Cambiar el botón de guardar por editar
    const guardarBtn = document.querySelector('#modalClientes .modal-footer button.btn-primary');
    guardarBtn.textContent = 'Editar';
    guardarBtn.onclick = function() {
        usuarioRegistrados[index] = {
            id: document.getElementById('identidad').value,
            name: document.getElementById('p_nombre').value + ' ' + document.getElementById('s_nombre').value + ' ' +
                document.getElementById('p_apellido').value + ' ' + document.getElementById('s_apellido').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('telefono').value
        };
        mostrarClientes(usuarioRegistrados);
        $('#modalClientes').modal('hide');
    };
}*/

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
