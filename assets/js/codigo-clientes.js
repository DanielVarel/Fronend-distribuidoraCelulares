// devuelve todos los registros
/*function  obtenerClientes(){
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

*/


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

// Esta función obtiene los datos de los clientes desde el servidor y los muestra en la tabla
function obtenerClientes() {
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            mostrarClientesEnTabla(data.clientes);
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
        });
}

// Esta función muestra los datos de los clientes en la tabla HTML
function mostrarClientesEnTabla(clientes) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.DNI}</td>
            <td>${cliente.P_NOMBRE}</td>
            <td>${cliente.S_NOMBRE}</td>
            <td>${cliente.P_APELLIDO}</td>
            <td>${cliente.S_APELLIDO}</td>
            <td>${cliente.TELEFONO}</td>
            <td>${cliente.CORREO}</td>
            <td>
            <button type="button" onclick="Eliminar(${cliente.ID})" > Eliminar</button>
            <button type="button" class="btn btn btn-primary" id="nuevo-cliente-editar" data-bs-toggle="modal"
            data-bs-target=#modalEditar onclick="Editar(${cliente.ID})">Editar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

function Eliminar(id){
    console.log(id);
    fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'delete',
        headers: {"Content-Type": "application/json"},
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log(datos);
        location.reload(true);
    })
    .catch(error => {
            console.log(error)
    }); 
}

function Editar(id){
    console.log(id);
    fetch(`http://localhost:3000/clientes/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.cliente); 
            actualizar(data.cliente)
        })
        .catch(error => {
            console.error('Error al obtener los clientes:', error);
        });


}

function actualizar(cliente){
    document.getElementById('modalEditarLabel1').innerText  = ``;
    document.getElementById('modalEditarLabel1').innerText  = `${cliente.ID}`

    document.getElementById('identidad1').value = cliente.DNI;
    document.getElementById('p_nombre1').value = cliente.P_NOMBRE;
    document.getElementById('s_nombre1').value = cliente.S_NOMBRE;
    document.getElementById('p_apellido1').value = cliente.P_APELLIDO;
    document.getElementById('s_apellido1').value = cliente.S_APELLIDO;
    document.getElementById('telefono1').value = cliente.TELEFONO;
    document.getElementById('email1').value = cliente.CORREO;
}

function actualizarCliente(){
    let idActualizar = document.getElementById('modalEditarLabel1').innerText

    console.log(idActualizar)

    const nuevoCliente = {
        DNI: document.getElementById('identidad1').value,
        P_NOMBRE: document.getElementById('p_nombre1').value,/* Obtén el primer nombre del nuevo cliente */
        S_NOMBRE: document.getElementById('s_nombre1').value,/* Obtén el segundo nombre del nuevo cliente */
        P_APELLIDO:  document.getElementById('p_apellido1').value,/* Obtén el primer apellido del nuevo cliente */
        S_APELLIDO: document.getElementById('s_apellido1').value,/* Obtén el segundo apellido del nuevo cliente */
        TELEFONO: document.getElementById('telefono1').value,/* Obtén el teléfono del nuevo cliente */
        CORREO: document.getElementById('email1').value,/* Obtén el correo del nuevo cliente */
    };

    console.log(nuevoCliente)

    fetch(`http://localhost:3000/clientes/${idActualizar}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(nuevoCliente)
      })
    .then((respuesta) => respuesta.json())  
    .then((datos) => {
        console.log('Se guardo correctamente', datos);
        obtenerClientes();
    })
    .catch(error => console.log(error));      
}
// Llamamos a la función para obtener y mostrar los clientes al cargar la página
obtenerClientes();


//POSIBLE POST
// Función para agregar un nuevo cliente


function agregarCliente() {
    
    // const nuevo = {
    //     name: document.getElementById('p_nombre').value + ' ' + document.getElementById('s_nombre').value + ' ' +
    //         document.getElementById('p_apellido').value + ' ' + document.getElementById('s_apellido').value,
    //     email: document.getElementById('email').value,
    //     phoneNumber: document.getElementById('telefono').value
    // };
    
    // console.log(nuevo)

    const nuevoCliente = {
        DNI: document.getElementById('identidad').value,
        P_NOMBRE: document.getElementById('p_nombre').value,/* Obtén el primer nombre del nuevo cliente */
        S_NOMBRE: document.getElementById('s_nombre').value,/* Obtén el segundo nombre del nuevo cliente */
        P_APELLIDO:  document.getElementById('p_apellido').value,/* Obtén el primer apellido del nuevo cliente */
        S_APELLIDO: document.getElementById('s_apellido').value,/* Obtén el segundo apellido del nuevo cliente */
        TELEFONO: document.getElementById('telefono').value,/* Obtén el teléfono del nuevo cliente */
        CORREO: document.getElementById('email').value,/* Obtén el correo del nuevo cliente */
    };

    console.log(nuevoCliente)

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensaje de confirmación del backend
            // Si el backend responde con éxito, podrías actualizar la tabla mostrando los clientes nuevamente
            obtenerClientes();
        })
        .catch(error => {
            console.error('Error al agregar el cliente:', error);
        });
        // Limpiar los campos del formulario
        document.getElementById('formularioClientesEditar').reset();
}



//FINPOST



// Función para agregar un nuevo cliente
// function agregarCliente() {
//     const nuevoId = document.getElementById('identidad').value;

//     // Verificar si ya existe un cliente con el mismo ID 
//     // const clienteExistente = usuarioRegistrados.find(cliente =>
//     //     cliente.id === nuevoId 
//     // );

//     // if (clienteExistente) {
//     //     alert('Ya existe un cliente con el mismo ID.');
//     //     return;
//     // }

//     const nuevoCliente = {
//         id: nuevoId,
//         name: document.getElementById('p_nombre').value + ' ' + document.getElementById('s_nombre').value + ' ' +
//             document.getElementById('p_apellido').value + ' ' + document.getElementById('s_apellido').value,
//         email: document.getElementById('email').value,
//         phoneNumber: document.getElementById('telefono').value
//     };
    
//     console.log(nuevoCliente)

//     // usuarioRegistrados.push(nuevoCliente);

//     // mostrarClientes(usuarioRegistrados);
    
//     // Limpiar los campos del formulario
//     document.getElementById('formularioClientes').reset();
// }

// Función para eliminar un cliente
function eliminarCliente(index) {
    usuarioRegistrados.splice(index, 1);
    mostrarClientes(usuarioRegistrados);
}

// Función para buscar un cliente por ID o nombre
function buscarCliente() {
    const buscar = document.getElementById('buscador').value;
    console.log(buscar);
    
        fetch(`http://localhost:3000/clientes-buscar/${buscar}`, {
        method: 'get',
        headers: {"Content-Type": "application/json"},
        })
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            clientes = datos.clientes;
            console.log(clientes)
            mostrarClientesEnTabla(clientes);
        })
        .catch(error => {
            console.log(error)
        }); 


}



// // Mostrar clientes al cargar la página
// mostrarClientes(usuarioRegistrados);


//Fin agregado K

