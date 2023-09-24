const animalImages = {
  tiburon: "./public/.png",
  carnero: "./public/.png",
  toro: "./public/.png",
  // x: './public/.png',
  leon: "./public/.png",
  rana: "./public/.png",
  // : './public/.png',
  //: './public/.png',
  aguila: "./public/.png",
  tigre: "./public/.png",
  gato: "./public/.png",
  caballo: "./public/.png",
  mono: "./public/.png",
  paloma: "./public/.png",
  zorro: "./public/.png",
  oso: "./public/.png",
  pavo: "./public/.png",
  burro: "./public/.png",
  chivo: "./public/.png",
  cochino: "./public/.png",
  gallo: "./public/.png",
  camello: "./public/.png",
  // : './public/.png',
  iguana: "./public/.png",
  //: './public/.png',
  vaca: "./public/.png",
  perro: "./public/.png",
  zamuro: "./public/.png", //zamuro??
  elefante: "./public/.png",
  caiman: "./public/.png",
  lapa: "./public/.png",
  //: './public/.png',
  pescado: "./public/.png",
  venado: "./public/.png",
  pantera: "./public/.png",
  culebra: "./public/culebra.png",
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

function obtenerDatosDeLoteria() {
  function generarNuevoLink() {
    // Obtener la fecha actual en el formato "YYYY-MM-DD"
    const fechaActual = new Date().toISOString().split("T")[0];

    const urlBase = "https://artesting.apuestasroyal.com/apiRoyal/resultados/";

    // Construir el nuevo enlace con la fecha actual
    const nuevoLink = urlBase + fechaActual;

    console.log("nuevo link: ", nuevoLink);

    return nuevoLink;
  }

  const url = generarNuevoLink();

  fetch("https://artesting.apuestasroyal.com/apiRoyal/resultados/2023-09-19")
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos de la API:", data);

      //  elemento resultadosContainer
      const resultadosContainer = document.getElementById(
        "resultados-container"
      );
      
      
      if (resultadosContainer) {
        // Crear  card del proximo sorteo
        console.log("Card proximo sorteo");
        //toma el ultimo sorteo hecho del momento
        let horarioDeseado = data[0].hora;
       
        let nuevoHorario;
        //verificar que no haya terminado el dia
        
        if (horarioDeseado !== "11:30 PM") {
          // Divide el horario en horas y minutos
          let partesHorario = horarioDeseado.split(" ");
          console.log(partesHorario)
          let horaMinutos = partesHorario[0].split(":");
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
         
          console.log("Horario original:"+ horarioDeseado);
          console.log("Nuevo horario:"+ nuevoHorario);
        
        
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
               <div class="lds-circle"><div></div><div></div><div></div><div></div></div>
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
          console.log("Lotería:", item.loteria);
          console.log("Número:", item.numero);
          console.log("Nombre:", item.nombre);
          console.log("Hora:", item.hora);
          console.log("Fecha:", item.fecha);
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
                                <small class="card-meta mb-2"><i class="far fa-clock dark-icon"></i>${item.hora}</small>
                                <h4 class="card-title mt-0">
                                    <a class="text-dark no-decoration" href="">${item.nombre}</a>
                                </h4>
                                <small class="text-dark">Numero ${item.numero}</small>
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
        console.error(
          'El elemento con ID "resultados-container" no existe en el HTML.'
        );
      }
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
    });
}

//
document.addEventListener("DOMContentLoaded", obtenerDatosDeLoteria);
