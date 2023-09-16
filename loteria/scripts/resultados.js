document.addEventListener('DOMContentLoaded', () => {
    const resultadosLista = document.getElementById('resultados-lista');

    // Realiza una solicitud GET a la API de resultados de lotería
    fetch('URL_DE_TU_API')
        .then(response => response.json())
        .then(data => {
            // Recorre los resultados y crea elementos HTML para mostrarlos
            data.resultados.forEach(resultado => {
                const li = document.createElement('li');
                li.textContent = `Lotería: ${resultado.nombre}, Número Ganador: ${resultado.numero}`;
                resultadosLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener resultados de la API:', error);
        });
});