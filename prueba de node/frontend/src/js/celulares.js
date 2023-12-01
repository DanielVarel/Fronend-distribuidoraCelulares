// devuelve todos los registros
function mostrarTodos() {
    // Cuerpo de la función
    fetch('http://localhost:3000/celulares')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
//********************************************************************************* */
//********************************************************************************* */



// devuelve un registro en especifico segun el ID
function mostrarUnRegistro(){
    const id = '3'; // Reemplaza con el ID deseado
    fetch(`http://localhost:3000/celulares/${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
//********************************************************************************* */
//********************************************************************************* */



// insertar un nuevo registro
function nuevoRegistro(){
    const postData = {
        "CELULARID" : '103',
        "MODELOID": '1',
        "NOMBRE_CELULAR": 'Iphone x',
        "MARCAID": '2',
        "PRECIO": '9000',
        "PROVEEDORID": '2',
        "CANTIDAD_RAM": '4', 
        "PROCESADORID": '2',
        "EMEI": '098567315159456', 
        "CAMARA_RESOLUCION": '32',
        "ALMACENAMIENTO": '64',
        "BATERIA": '4500',
        "DIMENSIONESID": '1',
        "PESO": '135',
        "SOID": '2', 
        "CANTIDAD_SIM": '2', 
        "COLORID": '1',
        "SKU": '12360000',
        "EXISTENCIA": '80'
    };
    
    fetch('http://localhost:3000/celulares', {
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
//********************************************************************************* */
//********************************************************************************* */




    // actualizar un registro segun ID
function actualizarRegistro(){
    const idToUpdate = '3'; // Reemplaza con el ID del registro a actualizar
    const putData = {
       
        "NOMBRE_CELULAR": 'Iphone XYZ',
        "PRECIO": '8500',
        "EXISTENCIA": '70'
    };

    fetch(`http://localhost:3000/celulares/${idToUpdate}`, {
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
//********************************************************************************* */
//********************************************************************************* */





// eliminar un registro por el ID
function eliminarRegistro(){
    const idToDelete = '103'; // Reemplaza con el ID del registro a eliminar

    fetch(`http://localhost:3000/celulares/${idToDelete}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
//********************************************************************************* */
//********************************************************************************* */