
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
            <button type="button">Eliminar</button>
            <button type="button">Editar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Llamamos a la función para obtener y mostrar los clientes al cargar la página
obtenerEmpleados();

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
