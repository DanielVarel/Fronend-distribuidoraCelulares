
function obtenerProveedores() {
    fetch('http://localhost:3000/proveedores') // Reemplaza la URL con la ruta de tu endpoint
        .then(response => response.json())
        .then(data => {
            mostrarProveedoresEnTabla(data.proveedores);
        })
        .catch(error => {
            console.error('Error al obtener los proveedores:', error);
        });
}

// Función para mostrar los datos de los proveedores en la tabla HTML
function mostrarProveedoresEnTabla(proveedores) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-proveedores');
    cuerpoTabla.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    proveedores.forEach(proveedor => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${proveedor.proveedorID}</td>
            <td>${proveedor.NOMBRE_PROVEEDOR}</td>
            <td>${proveedor.DIRECCIONID}</td>
            <td>${proveedor.PAISID}</td>
            <td>${proveedor.TELEFONO}</td>
            <td>${proveedor.CORREO}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Llamamos a la función para obtener y mostrar los proveedores al cargar la página
obtenerProveedores();


