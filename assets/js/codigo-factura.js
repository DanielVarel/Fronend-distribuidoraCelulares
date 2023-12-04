// Script para obtener los datos de facturas desde el backend
function obtenerFacturas() {
    fetch('http://localhost:3000/facturas') // Reemplaza la URL con la ruta de tu endpoint
        .then(response => response.json())
        .then(data => {
            mostrarFacturasEnTabla(data.facturas);
        })
        .catch(error => {
            console.error('Error al obtener las facturas:', error);
        });
}

// Función para mostrar los datos de las facturas en la tabla HTML
function mostrarFacturasEnTabla(facturas) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    facturas.forEach(factura => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${factura.VENTAID}</td>
            <td>${factura.TOTAL_VENTA}</td>
            <td>${factura.ISV}</td>
            <td>${factura.TOTAL_NETO}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Llamamos a la función para obtener y mostrar las facturas al cargar la página
obtenerFacturas();