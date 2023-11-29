// devuelve todos los registros
function mostrarRegistros() {
    // Cuerpo de la función
    fetch('http://localhost:3000/fromoracle')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}



// devuelve un registro en especifico segun el ID
function mostrarUnRegistro(){
    const id = '2'; // Reemplaza con el ID deseado
    fetch(`http://localhost:3000/fromoracle/${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

// insertar un nuevo registro
function nuevoRegistro(){
const postData = {
    ID: '444',
    NOMBRE: 'actubre',
    APELLIDO: 'varela',
    CORREO: 'varela.julio@example.com'
};

fetch('http://localhost:3000/fromoracle', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// actualizar un registro segun ID
function actualizarRegistro(){
    const idToUpdate = '444'; // Reemplaza con el ID del registro a actualizar
    const putData = {
        NOMBRE: 'junio',
        APELLIDO: 'perez',
        CORREO: 'actualizado@ejemplo.com'
    };

    fetch(`http://localhost:3000/fromoracle/${idToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

}

// eliminar un registro por el ID
function eliminarRegistro(){
    const idToDelete = '444'; // Reemplaza con el ID del registro a eliminar

    fetch(`http://localhost:3000/fromoracle/${idToDelete}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function mostrarTodos() {
    var boton = document.getElementById("miBoton");
    mostrarRegistros();
}
function mostrarEspecifico() {
    var boton = document.getElementById("miBoton");
    mostrarUnRegistro();
}

function insertar() {
    var boton = document.getElementById("miBoton");
    nuevoRegistro();
}

function actualizar() {
    var boton = document.getElementById("miBoton");
    actualizarRegistro();
}

function eliminar() {
    var boton = document.getElementById("miBoton");
    eliminarRegistro();
}