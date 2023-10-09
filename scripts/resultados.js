//array imagenes
const animalImages = {
  tiburon: "./public/animalitos/ruletaroyal_0.png",
  carnero: "./public/animalitos/ruletaroyal_01.png",
  toro: "./public/animalitos/ruletaroyal_02.png",
  ciempies: './public/animalitos/ruletaroyal_03.png',
  alacran: "./public/animalitos/ruletaroyal_04.png",
  leon: "./public/animalitos/ruletaroyal_05.png",
  rana: './public/animalitos/ruletaroyal_06.png',
  perico: './public/animalitos/ruletaroyal_07.png',
  raton: "./public/animalitos/ruletaroyal_08.png",
  aguila: "./public/animalitos/ruletaroyal_09.png",
  tigre: "./public/animalitos/ruletaroyal_10.png",
  gato: "./public/animalitos/ruletaroyal_11.png",
  caballo: "./public/animalitos/ruletaroyal_12.png",
  mono: "./public/animalitos/ruletaroyal_13.png",
  paloma: "./public/animalitos/ruletaroyal_14.png",
  zorro: "./public/animalitos/ruletaroyal_15.png",
  oso: "./public/animalitos/ruletaroyal_16.png",
  pavo: "./public/animalitos/ruletaroyal_17.png",
  burro: "./public/animalitos/ruletaroyal_18.png",
  chivo: "./public/animalitos/ruletaroyal_19.png",
  cochino: "./public/animalitos/ruletaroyal_20.png",
  gallo: "./public/animalitos/ruletaroyal_21.png",
  camello: './public/animalitos/ruletaroyal_22.png',
  cebra: "./public/animalitos/ruletaroyal_23.png",
  iguana: './public/animalitos/ruletaroyal_24.png',
  gallina: "./public/animalitos/ruletaroyal_25.png",
  vaca: "./public/animalitos/ruletaroyal_26.png",
  perro: "./public/animalitos/ruletaroyal_27.png", 
  zamuro: "./public/animalitos/ruletaroyal_28.png",
  elefante: "./public/animalitos/ruletaroyal_29.png",
  caiman: "./public/animalitos/ruletaroyal_30.png",
  lapa: './public/animalitos/ruletaroyal_31.png',
  ardilla: "./public/animalitos/ruletaroyal_32.png",
  pescado: "./public/animalitos/ruletaroyal_33.png",
  venado: "./public/animalitos/ruletaroyal_34.png",
  pantera: "./public/animalitos/ruletaroyal_35.png",
  culebra: "./public/animalitos/ruletaroyal_36.png",
};

// Array de horarios
const horarios = [
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "10:00 PM",
  "10:30 PM",
];

function obtenerImagenAnimal(nombreAnimal) {
  // Verifica si el nombre del animal existe en el objeto animalImages
  if (nombreAnimal.toLowerCase() in animalImages) {
    return animalImages[nombreAnimal.toLowerCase()];
  } else {
    return "imagen_no_encontrada.jpg";
  }
}

// Función para obtener la fecha actual en formato (DD/MM/YYYY)
function fechaHoy() {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  console.log(`${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`)
  return `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
}


// Función para obtener la fecha seleccionada
function obtenerFecha() {
  // Obtén la fecha seleccionada en el input de tipo date
  const fechaSeleccionada = document.getElementById('fecha_buscar').value;
  // Si no se ha seleccionado una fecha, utiliza la fecha actual
  console.log(fechaSeleccionada)
  return fechaSeleccionada ||fechaHoy();
}

// Función para generar el nuevo enlace de la API con la fecha
function generarNuevoLink() {
  const fechaConFormatoOriginal = obtenerFecha();
  const urlBase = "https://artesting.apuestasroyal.com/apiRoyal/resultados/";
  const nuevoLink = urlBase + fechaConFormatoOriginal;
  console.log("Nuevo enlace de la API:", nuevoLink);
  return nuevoLink;
}

// Función para limpiar el contenido del contenedor de resultados
function limpiarContenido() {
  const resultadosContainer = document.getElementById("resultados-container");

  while (resultadosContainer.firstChild) {
    resultadosContainer.removeChild(resultadosContainer.firstChild);
  }
}

async function obtenerDatosDeLoteria() {
  const url = generarNuevoLink();
  // Obtener el contenedor de resultados
  const resultadosContainer = document.getElementById("resultados-container");

  // Verificar si ya hay resultados en el contenedor y limpiarlos si es necesario
  if (resultadosContainer.hasChildNodes()) {
    limpiarContenido();
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Datos de la API:", data);

    if (data.error === 1) {
      const mensajeError = document.createElement("h1");
      mensajeError.textContent = data.message;
      const contenedorError = document.getElementById("resultados-container");
      contenedorError.appendChild(mensajeError);
    }

    const resultadosContainer = document.getElementById("resultados-container");

   
      if (resultadosContainer) {
        // Crear  card del proximo sorteo
        //console.log("Card proximo sorteo");
        //toma el ultimo sorteo hecho del momento
        let horarioDeseado = data[0].hora;
       
        let nuevoHorario;
        //verificar que no haya terminado el dia
        
        if (horarioDeseado !== "10:30 PM") {
          // Divide el horario en horas y minutos
          let partesHorario = horarioDeseado.split(" ");
          //console.log(partesHorario)
          let horaMinutos = partesHorario[0].split(":");
          //console.log(horaMinutos)
          let amPm = partesHorario[1];

          // Convierte las partes en números enteros
          let horas = parseInt(horaMinutos[0]);
          let minutos = parseInt(horaMinutos[1]);
         
          // Suma 1 a la hora
          let nuevaHora = horas + 1;
          if (amPm === "PM" && nuevaHora < 12) {
            nuevaHora += 12;
          }

          // Formatea la nueva hora y minutos
          if (nuevaHora >= 12) {
            amPm = "PM";
          } else {
            amPm = "AM";
          }

          if (nuevaHora > 12) {
            nuevaHora -= 12;
          }

          nuevoHorario = nuevaHora+":"+minutos+amPm;
         
          //console.log("Horario original:"+ horarioDeseado);
         // console.log("Nuevo horario:"+ nuevoHorario);
        
        
          
          const cardAdicional = document.createElement("div");
          cardAdicional.className = 'class="col-sm-12 col-md-6 col-lg-4 mb-4';
          cardAdicional.innerHTML = `
            <div>
              <div class="card text-dark card-has-bg click-col mb-4" style="
                background-image: url('./public/background-card.png')">
                <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                  <div class="card-body text-center">
                    <small class="card-meta mb-2"><i class="far fa-clock dark-icon"></i>${nuevoHorario}</small>
                    <h4 class="card-title mt-5">
                      <a class="text-dark no-decoration" href="">PROXIMO SORTEO</a>
                    </h4>
                    <small class="text-dark"></small>
                    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                  </div>
                  <div class="card-footer">
                    <div class="media">
                      <img class="mr-3 rounded-circle"
                        src="./public/logo1.png?format=auto&version=1688931977&width=80&height=80"
                        alt="Generic placeholder image" style="max-width: 50px" />
                      <div class="media-body">
                        <h6 class="my-0 text-dark d-block">Ruleta Royal</h6>
                        <small class="text-dark">${data[0].fecha}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
  
          // Agregar la nueva card al contenedor de resultados
          resultadosContainer.appendChild(cardAdicional);
        }
        
        data.forEach((item) => {
          // console.log("Lotería:", item.loteria);
          // console.log("Número:", item.numero);
          // console.log("Nombre:", item.nombre);
          // console.log("Hora:", item.hora);
          // console.log("Fecha:", item.fecha);
          let imagen = obtenerImagenAnimal(item.nombre)
          // console.log(obtenerImagenAnimal(item.nombre))
          console.log("-------------------");
          //const imagenAnimal = obtenerImagenAnimal(item.nombre);
          // Crea elementos
          const card = document.createElement("div");
          card.className = 'class="col-sm-12 col-md-6 col-lg-4 mb-4';
          card.innerHTML = `
            <div>
              <div class="card text-dark card-has-bg click-col mb-4" style="
                background-image: url('./public/background-card.png')">
                <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                  <div class="card-body text-center">
                    <h4 class="card-meta mb-2"><i class="far fa-clock dark-icon"></i>${item.hora}</h4>
                    <h4 class="card-title mt-0">
                      
                    </h4>
                    
                    <img class="mr-3 rounded-circle"
                      src="${imagen}"
                      alt="Animal" style="max-width: 200px" />
                  </div>
                  <div class="card-footer">
                    <div class="media">
                      <img class="mr-3 rounded-circle"
                        src="./public/logo1.png?format=auto&version=1688931977&width=80&height=80"
                        alt="Generic placeholder image" style="max-width: 50px" />
                      <div class="media-body">
                        <h6 class="my-0 text-dark d-block">Ruleta Royal</h6>
                        <small class="text-dark">${item.fecha}</small>
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
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  }
}


//
// Ejecutar la función obtenerDatosDeLoteria() al cargar la página
document.addEventListener("DOMContentLoaded", obtenerDatosDeLoteria);

// Agregar un evento al botón para ejecutar obtenerDatosDeLoteria() cuando se presione
document.getElementById("buscar_btn").addEventListener("click", obtenerDatosDeLoteria);
