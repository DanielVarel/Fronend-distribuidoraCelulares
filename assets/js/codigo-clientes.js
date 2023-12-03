

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
            <td>${cliente.ID}</td>
            <td>${cliente.DNI}</td>
            <td>${cliente.P_NOMBRE}</td>
            <td>${cliente.S_NOMBRE}</td>
            <td>${cliente.P_APELLIDO}</td>
            <td>${cliente.S_APELLIDO}</td>
            <td>${cliente.TELEFONO}</td>
            <td>${cliente.CORREO}</td>
            <td>
            <button type="button">Eliminar</button>
            <button type="button">Editar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Llamamos a la función para obtener y mostrar los clientes al cargar la página
obtenerClientes();


//POSIBLE POST
// Función para agregar un nuevo cliente


function agregarCliente() {
    const nuevoCliente = {
        ID: /* Obtén el ID del nuevo cliente */
        P_NOMBRE: /* Obtén el primer nombre del nuevo cliente */
        S_NOMBRE: /* Obtén el segundo nombre del nuevo cliente */
        P_APELLIDO: /* Obtén el primer apellido del nuevo cliente */
        S_APELLIDO: /* Obtén el segundo apellido del nuevo cliente */
        TELEFONO: /* Obtén el teléfono del nuevo cliente */
        CORREO: /* Obtén el correo del nuevo cliente */
        DNI: /* Obtén el DNI del nuevo cliente */
    };

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
}


//FINPOST



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

