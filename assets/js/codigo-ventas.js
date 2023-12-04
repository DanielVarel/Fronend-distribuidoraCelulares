// Esta función obtiene los datos de las ventas desde el servidor y los muestra en la tabla
function obtenerVentas() {
    fetch('http://localhost:3000/ventas')
        .then(response => response.json())
        .then(data => {
            mostrarVentasEnTabla(data.ventas);
            console.log(data.ventas)
        })
        .catch(error => {
            console.error('Error al obtener los detalles de ventas:', error);
        });
}

// Esta función muestra los campos de las ventas en la tabla
function mostrarVentasEnTabla(ventas) {
    const cuerpoTablaVentas = document.getElementById('cuerpo-tabla-ventas');
    cuerpoTablaVentas.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    ventas.forEach(venta => {
        console.log(venta)

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${venta.ID}</td>
            <td>${venta.Empleado}</td>
            <td>${venta.Cliente}</td>
            <td>${venta.FechaVenta}</td>
            <td>${venta.TipoPago}</td>
            <td>
            <button type="button" class="btn btn btn-primary" id="venta#${venta.ventaID}" data-bs-toggle="modal" data-bs-target=#modalVerFactura>Ver factura</button>
            </td>
        `;
        cuerpoTablaVentas.appendChild(fila);
    });
}

// Llamamos a la función para obtener y mostrar las ventas al cargar la página
obtenerVentas();

//Agregar una venta

function agregarVenta(){
    const nuevaVenta ={
        FECHA_VENTA: document.getElementById('fecha_venta').value,
        CLIENTE: document.getElementById('clienteID').value,
        EMPLEADO: document.getElementById('empleadoID').value,
        TIPOPAGO: document.getElementById('tipoPagoID').value,
    };

    console.log(nuevaVenta)

    fetch('http://localhost:3000/venta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaVenta),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensaje de confirmación del backend
            // Si el backend responde con éxito, podrías actualizar la tabla mostrando los clientes nuevamente
            obtenerVentas();
        })
        .catch(error => {
            console.error('Error al agregar la venta:', error);
        });

        const nuevoDetalleVenta ={
            //CELULARID
            CANTIDAD: document.getElementById('cantidadCelular').value,
        };

        console.log(nuevoDetalleVenta)

    fetch('http://localhost:3000/detalle_venta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoDetalleVenta),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensaje de confirmación del backend
            // Si el backend responde con éxito, podrías actualizar la tabla mostrando los clientes nuevamente
            obtenerVentas();
        })
        .catch(error => {
            console.error('Error al agregar la venta_detalle:', error);
        });


        // Limpiar los campos del formulario
        document.getElementById('formularioVenta').reset();
}

function obtenerModelos(){
    fetch('http://localhost:3000/modelo')
        .then(response => response.json())
        .then(data => {
            mostrarModelos(data.modelo);
        })
        .catch(error => {
            console.error('Error al obtener los modelos:', error);
        });
}

//MUESTRA LOS MODELOS PARA AGREGAR UNA NUEVA VENTA
function mostrarModelos(modelo){
    const modelosDataList = document.getElementById('modeloOptionsList');
    modelosDataList.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    modelo.forEach(modelo => {
        console.log(modelo)

        const listElement = document.createElement('option');
        listElement.value = `
            ${modelo.nombre_modelo}
        `;
        modelosDataList.appendChild(listElement);
    });
}