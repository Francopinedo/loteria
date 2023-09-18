function generarNuevoLink() {
    // Obtener la fecha actual en el formato "YYYY-MM-DD"
    const fechaActual = new Date().toISOString().split('T')[0];

    // URL base antes de la fecha
    const urlBase = 'https://artesting.apuestasroyal.com/apiRoyal/resultados/';

    // Construir el nuevo enlace con la fecha actual
    const nuevoLink = urlBase + fechaActual;

    return nuevoLink;
}