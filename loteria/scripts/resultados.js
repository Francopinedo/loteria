function obtenerDatosDeLoteria() {
    function generarNuevoLink() {
        // Obtener la fecha actual en el formato "YYYY-MM-DD"
        const fechaActual = new Date().toISOString().split('T')[0];
    
        // URL base antes de la fecha
        const urlBase = 'https://artesting.apuestasroyal.com/apiRoyal/resultados/';
    
        // Construir el nuevo enlace con la fecha actual
        const nuevoLink = urlBase + fechaActual;
    
        console.log('nuevo link: ', nuevoLink);
    
        return nuevoLink;
    }

    // URL de la API (reemplaza con la URL real de tu API)
    const url = generarNuevoLink();
    
    fetch('https://artesting.apuestasroyal.com/apiRoyal/resultados/2023-09-17')
        .then(response => response.json())
        .then(data => {
            // Comprueba si estás recibiendo datos de la API
            console.log('Datos de la API:', data);

            // Obtén el elemento resultadosContainer
            const resultadosContainer = document.getElementById('resultados-container');

            if (resultadosContainer) {
                // Itera a través de los datos y muestra cada elemento en la consola
                data.forEach(item => {
                    console.log('Lotería:', item.loteria);
                    console.log('Número:', item.numero);
                    console.log('Nombre:', item.nombre);
                    console.log('Hora:', item.hora);
                    console.log('Fecha:', item.fecha);
                    console.log('-------------------');

                    // Crea elementos de tarjeta y agrégaga al documento HTML
                    const card = document.createElement('div');
                    card.className = '';
                    card.innerHTML = `
                        <div class="bg-white rounded shadow-sm  w-100 mt-3 mb-3 mr-20 ">
                            <img src="public/no-image-lottery.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                            <h5 class="mb-0">${item.nombre}</h5>
                            <span class="small text-uppercase text-muted">${item.numero}</span>
                        </div>
                    `;
                    resultadosContainer.appendChild(card);
                });
            } else {
                console.error('El elemento con ID "resultados-container" no existe en el HTML.');
            }
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}

// Llama a la función para obtener los datos de la lotería cuando se carga la página
document.addEventListener('DOMContentLoaded', obtenerDatosDeLoteria);