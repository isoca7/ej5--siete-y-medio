import confetti from "canvas-confetti";
let puntuacion = 0;
const botonDarCarta = document.getElementById("dame_carta");
const botonParar = document.getElementById("parar");
const containerBotones = document.getElementById("dar_reiniciar");
const mensajeResultado = document.getElementById("resultado");
const siguienteCarta = document.getElementById("siguiente_carta");


const muestraPuntuacion = () => {
  const elementoPuntuacion = document.getElementById("puntuacion");

  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `<h3>Tu puntuación es: <span>${puntuacion}</span></h3>`;
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const generarNumeroAleatorio = () => {
  return Math.floor(Math.random() * 10 + 1);
};

const obtenerValorCarta = (numeroAleatorio) => {
  if (numeroAleatorio > 7) {
    numeroAleatorio += 2;
  }
  return numeroAleatorio;
};

const obtenerPuntosCarta = (carta) => {
  return carta > 7 ? 0.5 : carta;
};

const sumaPuntos = (puntos) => {
  return puntuacion + puntos;
};

const setPuntuacion = (puntosSumados) => {
  puntuacion = puntosSumados;
};

const obtenerUrlCarta = (carta) => {
  switch (carta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
    case 12:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
  }
};

const pintarUrlCarta = (urlCarta) => {
  const elementoImg = document.getElementById("carta");

  if (elementoImg !== null && elementoImg !== undefined) {
    elementoImg.src = urlCarta;
  }
};

const obtenerMensajeResultado = (puntuacion) => {
  if (puntuacion <= 4.5) {
    return  `<p>Has sido muy conservador</p>`;
  } else if (puntuacion >= 5 && puntuacion < 6) {
    return `<p>Te ha entrado el canguelo eh?</p>`;
   
  } else if (puntuacion >= 6 && puntuacion <= 7) {
    return `<p>Casi casi..</p>`;
    
  } else if (puntuacion === 7.5) {
    return `<p class='rainbow'>"¡Lo has clavado! ¡Enhorabuena!"</p>`
  }
};

const mostrarQueHubiesesSacado =()=>{
  const numeroAleatorio = generarNumeroAleatorio();
  const carta = obtenerValorCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(carta);
  siguienteCarta.innerHTML = `<p>Hubieses sacado un ${carta}</p>`;
  pintarUrlCarta(urlCarta);
}

const mostrarMensajeResultado = (textoMensaje)=>{
  const mensajeResultado = document.getElementById("resultado");
  if(mensajeResultado){
    mensajeResultado.innerHTML = textoMensaje
  }
  

}

const ganarPartida = () => {
  const mensaje = obtenerMensajeResultado(puntuacion)
  mostrarMensajeResultado(mensaje)
    reiniciarJuego()
    confetti();
  
};

const perderPartida = () => {
  if(mensajeResultado){
    mensajeResultado.innerHTML = `<p style='color:black; font-size: 3em; text-shadow: 0 0 20px #fff, 0 0 30px #fff, 0 0 50px #fff, 0 0 60px #fff, 0 0 70px #fff'>Game over!</p>`;
  }
    reiniciarJuego()
  
};

const gestionarPartidas = () => {
  if (puntuacion === 7.5) {
    ganarPartida();
  }

  if (puntuacion > 7.5) {
    perderPartida();
  }
};
const quitarBotones = () => {
  botonDarCarta.remove();
};
const reloadpagina = ()=>{
  location.reload()
}
const reiniciarJuego = () => {
  quitarBotones()
  containerBotones.innerHTML = `<button type="button" id="reiniciar">Nueva partida 🎇</button>`;
  const botonReiniciar = document.getElementById("reiniciar");
  botonReiniciar.addEventListener("click", reloadpagina);
  
};

const handleBotonDameCarta = () => {
  const numeroAleatorio = generarNumeroAleatorio();
  const carta = obtenerValorCarta(numeroAleatorio);
  const puntosCarta = obtenerPuntosCarta(carta);
  const puntosSumados = sumaPuntos(puntosCarta);
  const urlCarta = obtenerUrlCarta(carta);
  pintarUrlCarta(urlCarta);
  setPuntuacion(puntosSumados);
  gestionarPartidas();
  muestraPuntuacion();
  
};

const handleBotonParar = () => {
  const mensaje = obtenerMensajeResultado(puntuacion)
  mostrarMensajeResultado(mensaje)
  mostrarQueHubiesesSacado()
  reiniciarJuego()
  
};

botonDarCarta.addEventListener("click", handleBotonDameCarta);
botonParar.addEventListener("click", handleBotonParar);
