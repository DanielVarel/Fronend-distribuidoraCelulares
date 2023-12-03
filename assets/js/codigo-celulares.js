
//Agregado K

// Esta función obtiene los datos de los clientes desde el servidor y los muestra en la tabla
function obtenerCelulares() {
    fetch('http://localhost:3000/celulares')
        .then(response => response.json())
        .then(data => {
            mostrarCelularesEnTabla(data.celulares);
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
        });
}

// Esta función muestra los datos de los clientes en la tabla HTML
function mostrarCelularesEnTabla(celulares) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    celulares.forEach(celular => {
        //Para Concatenar nombre
        //const nombreCompleto = `${empleado.P_NOMBRE} ${empleado.S_NOMBRE} ${empleado.P_APELLIDO} ${empleado.S_APELLIDO}`;
        
        //Para concatenar horario
        //const horario = `${empleado.HORA_ENTRADA} <span>-</span> ${empleado.HORA_SALIDA}`;


        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${celular.celularID}</td>
            <td>${celular.MODELO}</td>
            <td>${celular.NOMBRE_CELULAR}</td>
            <td>${celular.MARCA}</td>
            <td>${celular.PRECIO}</td>
            <td>${celular.RESOLUCION_CAMARA}</td>
            <td>${celular.ALMACENAMIENTO}</td>
            <td>${celular.SISTEMA_OPERATIVO}</td>
            <td>${celular.COLOR}</td>
            <td>${celular.CANTIDAD_RAM}</td>
            <td>
            <button type="button">Eliminar</button>
            <button type="button">Editar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Llamamos a la función para obtener y mostrar los clientes al cargar la página
obtenerCelulares();

//Agregar un celular

function agregarCelular(){
    const nuevoCelular ={
        MODELO: document.getElementById('modelo').value,
        NOMBRE_CELULAR: document.getElementById('nombre').value,
        MARCA: document.getElementById('marca').value,
        PRECIO: document.getElementById('precio').value,
        RESOLUCION_CAMARA: document.getElementById('camara').value,
        ALMACENAMIENTO: document.getElementById('almacenamiento').value,
        SISTEMA_OPERATIVO: document.getElementById('so').value,
        COLOR: document.getElementById('color').value,
        CANTIDAD_RAM: document.getElementById('ram').value,
    };

    console.log(nuevoCelular)

    fetch('http://localhost:3000/celulares', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCelular),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensaje de confirmación del backend
            // Si el backend responde con éxito, podrías actualizar la tabla mostrando los clientes nuevamente
            obtenerCelulares();
        })
        .catch(error => {
            console.error('Error al agregar el celular:', error);
        });
        // Limpiar los campos del formulario
        document.getElementById('formularioEmpleadosEditar').reset();
}