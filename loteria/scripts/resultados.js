
function obtenerDatosDeLoteria() {
    // URL de la API (reemplaza con la URL real de tu API)
    const url = 'https://artesting.apuestasroyal.com/apiRoyal/resultados/2023-09-14';
    const resultadosLista = document.getElementById('resultados-lista');
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Itera a través de los datos y muestra cada elemento en la consola
            data.forEach(item => {
                console.log('Lotería:', item.loteria);
                console.log('Número:', item.numero);
                console.log('Nombre:', item.nombre);
                console.log('Hora:', item.hora);
                console.log('Fecha:', item.fecha);
                console.log('-------------------');

                // Crea elementos de lista y agrégalos al documento HTML
                const li = document.createElement('li');
                li.textContent = `Lotería: ${item.nombre}, Número Ganador: ${item.numero}`;
                resultadosLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:'+ error);
        });
}

// Llama a la función para obtener los datos de la lotería cuando se carga la página
document.addEventListener('DOMContentLoaded', obtenerDatosDeLoteria);