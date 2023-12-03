
//Agregado K

// Esta función obtiene los datos de los clientes desde el servidor y los muestra en la tabla
function obtenerEmpleados() {
    fetch('http://localhost:3000/empleados')
        .then(response => response.json())
        .then(data => {
            mostrarEmpleadosEnTabla(data.empleados);
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
        });
}

// Esta función muestra los datos de los clientes en la tabla HTML
function mostrarEmpleadosEnTabla(empleados) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    empleados.forEach(empleado => {
        //Para Concatenar nombre
        const nombreCompleto = `${empleado.P_NOMBRE} ${empleado.S_NOMBRE} ${empleado.P_APELLIDO} ${empleado.S_APELLIDO}`;
        
        //Para concatenar horario
        const horario = `${empleado.HORA_ENTRADA} <span>-</span> ${empleado.HORA_SALIDA}`;


        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${empleado.empleadoID}</td>
            <td>${empleado.DNI}</td>
            <td>${nombreCompleto}</td>
            <td>${empleado.TELEFONO}</td>
            <td>${empleado.CORREO}</td>
            <td>${empleado.DEPARTAMENTO}</td>
            <td>${empleado.CARGO}</td>
            <td>${empleado.FECHA_INGRESO}</td>
            <td>${empleado.DIRECCION}</td>
            <td>${horario}</td>
            <td>
            <button type="button" id="nuevo-empleado-editar" onclick="Editar(${empleado.ID}>Editar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}


function Editar(id){
    console.log(id);
    fetch(`http://localhost:3000/empleados/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.empleado); 
            actualizar(data.empleado)
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
        });


}

function actualizar(empleado){
    document.getElementById('modalEditarLabel1').innerText  = ``;
    document.getElementById('modalEditarLabel1').innerText  = `${empleado.ID}`

    document.getElementById('identidad1').value = empleado.DNI;
    document.getElementById('p_nombre1').value = empleado.P_NOMBRE;
    document.getElementById('s_nombre1').value = empleado.S_NOMBRE;
    document.getElementById('p_apellido1').value = empleado.P_APELLIDO;
    document.getElementById('s_apellido1').value = empleado.S_APELLIDO;
    document.getElementById('telefono1').value = empleado.TELEFONO;
    document.getElementById('email1').value = empleado.CORREO;
    document.getElementById('departamento1').value = empleado.DEPARTAMENTO;
    document.getElementById('cargo1').value= empleado.CARGO;
    document.getElementById('fecha_ingreso1').value= empleado.FECHA_INGRESO;
    document.getElementById('direccion1').value= empleado.DIRECCION;
    document.getElementById('hora_entrada1').value= empleado.HORA_ENTRADA;
    document.getElementById('hora_salida1').value= empleado.HORA_SALIDA;


}

function actualizarEmpleado(){
    let idActualizar = document.getElementById('modalEditarLabel1').innerText

    console.log(idActualizar)

    const nuevoEmpleado = {
        DNI: document.getElementById('identidad1').value,
        P_NOMBRE: document.getElementById('p_nombre1').value,/* Obtén el primer nombre del nuevo cliente */
        S_NOMBRE: document.getElementById('s_nombre1').value,/* Obtén el segundo nombre del nuevo cliente */
        P_APELLIDO:  document.getElementById('p_apellido1').value,/* Obtén el primer apellido del nuevo cliente */
        S_APELLIDO: document.getElementById('s_apellido1').value,/* Obtén el segundo apellido del nuevo cliente */
        TELEFONO: document.getElementById('telefono1').value,/* Obtén el teléfono del nuevo cliente */
        CORREO: document.getElementById('email1').value,/* Obtén el correo del nuevo cliente */
        DEPARTAMENTO: document.getElementById('departamento1').value,/* Obtén el correo del nuevo cliente */
        CARGO: document.getElementById('cargo1').value,/* Obtén el correo del nuevo cliente */
        FECHA_INGRESO: document.getElementById('fecha_ingreso1').value,
        DIRECCION: document.getElementById('direccion1').value,/* Obtén el correo del nuevo cliente */
        HORA_ENTRADA: document.getElementById('hora_entrada1').value,/* Obtén el correo del nuevo cliente */
        HORA_SALIDA: document.getElementById('hora_salida1').value
    
    
    };

    console.log(nuevoEmpleado)

    fetch(`http://localhost:3000/empleados/${idActualizar}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(nuevoEmpleado)
      })
    .then((respuesta) => respuesta.json())  
    .then((datos) => {
        console.log('Se guardo correctamente', datos);
        obtenerEmpleados();
    })
    .catch(error => console.log(error));      
}
// Llamamos a la función para obtener y mostrar los clientes al cargar la página
obtenerEmpleados();


//POSIBLE POST
// Función para agregar un nuevo cliente


function agregarEmpleado() {
    
    // const nuevo = {
    //     name: document.getElementById('p_nombre').value + ' ' + document.getElementById('s_nombre').value + ' ' +
    //         document.getElementById('p_apellido').value + ' ' + document.getElementById('s_apellido').value,
    //     email: document.getElementById('email').value,
    //     phoneNumber: document.getElementById('telefono').value
    // };
    
    // console.log(nuevo)

    const nuevoEmpleado = {
        DNI: document.getElementById('identidad').value,
        P_NOMBRE: document.getElementById('p_nombre').value,/* Obtén el primer nombre del nuevo cliente */
        S_NOMBRE: document.getElementById('s_nombre').value,/* Obtén el segundo nombre del nuevo cliente */
        P_APELLIDO:  document.getElementById('p_apellido').value,/* Obtén el primer apellido del nuevo cliente */
        S_APELLIDO: document.getElementById('s_apellido').value,/* Obtén el segundo apellido del nuevo cliente */
        TELEFONO: document.getElementById('telefono').value,/* Obtén el teléfono del nuevo cliente */
        CORREO: document.getElementById('email').value,/* Obtén el correo del nuevo cliente */
        DEPARTAMENTO: document.getElementById('departamento').value,/* Obtén el correo del nuevo cliente */
        CARGO: document.getElementById('cargo').value,/* Obtén el correo del nuevo cliente */
        FECHA_INGRESO: document.getElementById('fecha_ingreso').value,
        DIRECCION: document.getElementById('direccion').value,/* Obtén el correo del nuevo cliente */
        HORA_ENTRADA: document.getElementById('hora_entrada').value,/* Obtén el correo del nuevo cliente */
        HORA_SALIDA: document.getElementById('hora_salida').value,/* Obtén el correo del nuevo cliente */
    };

    console.log(nuevoEmpleado)

    fetch('http://localhost:3000/empleados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensaje de confirmación del backend
            // Si el backend responde con éxito, podrías actualizar la tabla mostrando los clientes nuevamente
            obtenerEmpleados();
        })
        .catch(error => {
            console.error('Error al agregar el empleado:', error);
        });
        // Limpiar los campos del formulario
        document.getElementById('formularioEmpleadosEditar').reset();
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

//mostrarEmpleados(usuarioRegistrados);


//Fin agregado K
