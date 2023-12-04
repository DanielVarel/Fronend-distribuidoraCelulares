
// Esta función obtiene los datos de los compras desde el servidor y los muestra en la tabla
function obtenerCompras() {
    fetch('http://localhost:3000/compras')
        .then(response => response.json())
        .then(data => {
            mostrarComprasEnTabla(data.compras);
        })
        .catch(error => {
            console.error('Error al obtener los compras:', error);
        });
}

// Esta función muestra los datos de los compras en la tabla HTML
function mostrarComprasEnTabla(compras) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    compras.forEach(compra => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${compra.COMPRAID}</td>
            <td>${compra.EMPLEADOID}</td>
            <td>${compra.PROVEEDORID}</td>
            <td>${new Date(compra.FECHACOMPRA).toLocaleDateString()}</td>
            <td>${compra.TIPOPAGOID}</td>

            <td>
            <button type="button" onclick="Eliminar(${compra.ID})" > Eliminar</button>
            <button type="button" class="btn btn btn-primary" id="nuevo-compra-editar" data-bs-toggle="modal"
            data-bs-target=#modalEditar onclick="Editar(${compra.ID})">Editar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

//=====================================================================================================
//=====================================================================================================


// Llamamos a la función para obtener y mostrar los clientes al cargar la página
obtenerCompras();
//=====================================================================================================
function formatearFecha(fecha) {
  const fechaObjeto = new Date(fecha);
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  // Obtener los componentes de la fecha
  const dia = fechaObjeto.toLocaleDateString('es-ES', { day: 'numeric' });
  const mes = fechaObjeto.toLocaleDateString('es-ES', { month: 'numeric' });
  const año = fechaObjeto.toLocaleDateString('es-ES', { year: 'numeric' });

  // Unir los componentes con guiones
  return `${dia}-${mes}-${año}`;
}
//=====================================================================================================
//=====================================================================================================

// Función para agregar un nuevo compra
function agregarCompra() {
    const nuevoCompra = {
        EMPLEADOID: document.getElementById('empleadoid').value,/* Obtén el primer nombre del nuevo compra */
        PROVEEDORID: document.getElementById('proveedorid').value,/* Obtén el segundo nombre del nuevo compra */
        FECHACOMPRA: formatearFecha(document.getElementById('fechacompra').value),/* Obtén el primer apellido del nuevo compra */
        TIPOPAGOID: document.getElementById('tipopagoid').value/* Obtén el segundo apellido del nuevo compra */
    };

    fetch('http://localhost:3000/compras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCompra)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            obtenerCompras();
        })
        .catch(error => {
            console.error('Error al agregar el compra:', error);
        });
        // Limpiar los campos del formulario
        document.getElementById('formularioComprasEditar').reset();
        
}


//=====================================================================================================
// Obtener referencia al select en el frontend
const selectTipoPago = document.getElementById('tipopagoid');

// Realizar la solicitud GET al servidor
fetch('http://localhost:3000/tipoPagoParaSelect')
  .then(response => response.json())
  .then(data => {
    // Llenar el select con los datos obtenidos
    data.tipoPago.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.tipoPagoID;
      option.text = tipo.metodoPago;
      selectTipoPago.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

//=====================================================================================================
// Obtener referencia al select en el frontend
const selectProveedores = document.getElementById('proveedorid');

// Realizar la solicitud GET al servidor
fetch('http://localhost:3000/proveedoresParaSelect')
  .then(response => response.json())
  .then(data => {
    // Llenar el select con los datos obtenidos
    data.proveedores.forEach(proveedor => {
      const option = document.createElement('option');
      option.value = proveedor.ID;
      option.text = proveedor.NombreProveedor;
      selectProveedores.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

//=====================================================================================================
// Obtener referencia al select en el HTML
const selectEmpleados = document.getElementById('empleadoid');

// Realizar la solicitud GET al servidor
fetch('http://localhost:3000/empleadosParaSelect')
  .then(response => response.json())
  .then(data => {
    // Llenar el select con los datos obtenidos
    data.empleados.forEach(empleado => {
      const option = document.createElement('option');
      option.value = empleado.empleadoID;
      option.text = empleado.nombreCompleto;
      selectEmpleados.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


//=====================================================================================================
// Función para obtener datos de celulares 
async function obtenerDatosCelulares() {
  try {
    const response = await fetch('http://localhost:3000/celulares');
    const data = await response.json();
    return data.celulares; // Retornar los datos de celulares obtenidos
  } catch (error) {
    console.error('Error al obtener datos de celulares:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
}

// Función para llenar el select con datos de celulares
async function llenarSelectCelulares() {
  const datosCelulares = await obtenerDatosCelulares();

  const contenedorCampos = document.getElementById('contenedorCampos');
  const nuevoSelect = document.createElement('select');
  nuevoSelect.name = 'selectCelulares'; 
  datosCelulares.forEach(celular => {
    const opcion = document.createElement('option');
    opcion.ariaPlaceholder = 'Celular';
    opcion.value = celular.CelularID; // Valor del celular
    opcion.text = celular.Nombre_celular; // Texto que se muestra en el select
    nuevoSelect.appendChild(opcion);
  });

  contenedorCampos.appendChild(nuevoSelect);
}

// Función para agregar un campo de cantidad (input numérico)
function agregarCampoCantidad() {
  const contenedorCampos = document.getElementById('contenedorCampos');
  const nuevoInput = document.createElement('input');
  nuevoInput.min = 1;
  nuevoInput.type = 'number';
  nuevoInput.name = 'cantidad'; // Nombre del input

  contenedorCampos.appendChild(nuevoInput);
}


const botonAgregar = document.getElementById('agregarCampo');
botonAgregar.textContent = 'Agregar celular';
botonAgregar.addEventListener('click', () => {
  llenarSelectCelulares(); // Llena el select de celulares
  agregarCampoCantidad(); // Agrega el campo de cantidad
});



//=====================================================================================================
//=====================================================================================================




// Función para buscar un compra por ID o nombre
function buscarCompra() {
  const buscar = document.getElementById('buscador').value;
  console.log(buscar);
  
      fetch(`http://localhost:3000/compras/${buscar}`, {
      method: 'get',
      headers: {"Content-Type": "application/json"},
      })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
          compras = datos.compras;
          console.log(compras)
          mostrarComprasEnTabla(compras);
      })
      .catch(error => {
          console.log(error)
      }); 
}


