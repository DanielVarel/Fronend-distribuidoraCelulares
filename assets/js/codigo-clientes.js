var usuarioRegistrados = [];

// devuelve todos los registros
function  obtenerClientes(){
    fetch(`http://localhost:3000/clientes`, {
        method: 'get',
        headers: {"Content-Type": "application/json"},
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        usuarioRegistrados = datos;
        console.log(usuarioRegistrados)
        mostrarClientes();
    })
    .catch(error => {
            console.log(error)
    }); 
}

obtenerClientes();



// fetch(`http://localhost:3000/clientes`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//     }
//   })
//   .then((respuesta) => respuesta.json())
//   .then(async (result) => {
//     usuarioRegistrados = result;
//     console.log(usuarioRegistrados);
//     mostrarClientes(usuarioRegistrados);
// }); 



// function obtenerDatos() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         fetch('http://localhost:3000/clientes')
//     .then(response => response.json())
//     .then(usuarioRegistrados => console.log(usuarioRegistrados))
//     .catch(error => console.error('Error:', error));
//       }, 1000); // Simulando una operación asincrónica, como una solicitud a una API
//     });
//   }

// async function mostrarRegistrosClientes() {
//     // Cuerpo de la función
//     obtenerDatos();
// }


// mostrarRegistrosClientes();


//Agregado K


// Función para mostrar los clientes en la tabla
function mostrarClientes() {
    let clientes = usuarioRegistrados
    
    let tabla = '';
    for (let i = 0; i < clientes.length; i++) {
        tabla += `<tr class="detalles-tabla">
                    <td>${clientes[i].ID}</td>
                    <td><p>${clientes[i].P_NOMRE}</p></td>
                    <td>${clientes[i].email}</td>
                    <td>${clientes[i].phoneNumber}</td>
                    <td>
                    <button style="width=100px" onclick="eliminarCliente(${i})">Eliminar</button>
                    <button style="width=100px" >Editar</button>
                    </td>
                </tr>`;
    }

    document.getElementById('seccion-clientes').innerHTML = `
        <div class="card">
            <table border>
                <tr class="detalles-tabla">
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



// // Mostrar clientes al cargar la página
// mostrarClientes(usuarioRegistrados);


//Fin agregado K

