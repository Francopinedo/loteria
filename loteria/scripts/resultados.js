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
    
    fetch('https://artesting.apuestasroyal.com/apiRoyal/resultados/2023-09-19')
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
                    card.className = 'class="col-sm-12 col-md-6 col-lg-4 mb-4';
                    card.innerHTML = `
                        <div>
                            <div class="card text-dark card-has-bg click-col mb-4" style="
                                background-image: url('./public/background-card.png')">
                                <div class="card-img-overlay d-flex flex-column">
                                    <div class="card-body">
                                        <small class="card-meta mb-2"><i class="far fa-clock"></i>${item.hora}</small>
                                        <h4 class="card-title mt-0">
                                            <a class="text-dark" herf="">${item.nombre}</a>
                                        </h4>
                                        <small>Numero ${item.numero}</small>
                                    </div>
                                    <div class="card-footer">
                                        <div class="media">
                                            <img class="mr-3 rounded-circle"
                                                src="./public/logo1.png?format=auto&version=1688931977&width=80&height=80"
                                                alt="Generic placeholder image" style="max-width: 50px" />
                                            <div class="media-body">
                                                <h6 class="my-0 text-dark d-block">Ruleta Royal</h6>
                                                <small>${item.fecha}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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