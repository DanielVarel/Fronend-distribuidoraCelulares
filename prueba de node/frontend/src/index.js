
// devuelve todos los registros
fetch('http://localhost:3000/fromoracle')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// devuelve un registro en especifico segun el ID
const id = '2'; // Reemplaza con el ID deseado
fetch(`http://localhost:3000/fromoracle/${id}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// insertar un nuevo registro
// const postData = {
//     ID: '20',
//     NOMBRE: 'julio',
//     APELLIDO: 'varela',
//     CORREO: 'varela.julio@example.com'
// };

// fetch('http://localhost:3000/fromoracle', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));

// actualizar un registro segun ID
// const idToUpdate = '20'; // Reemplaza con el ID del registro a actualizar
// const putData = {
//     NOMBRE: 'junio',
//     APELLIDO: 'perez',
//     CORREO: 'actualizado@ejemplo.com'
// };

// fetch(`http://localhost:3000/fromoracle/${idToUpdate}`, {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(putData)
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));

// eliminar un registro por el ID
// const idToDelete = '20'; // Reemplaza con el ID del registro a eliminar

// fetch(`http://localhost:3000/fromoracle/${idToDelete}`, {
//     method: 'DELETE'
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));