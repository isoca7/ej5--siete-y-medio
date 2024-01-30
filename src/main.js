import confetti from 'canvas-confetti'
let puntuacion = 0
let carta_dada
let mensajeResultado = document.getElementById('resultado')
const botonDarCarta = document.getElementById('dame_carta')
const botonParar = document.getElementById('parar')
const containerBotones = document.getElementById('dar_reiniciar')
const siguienteCarta = document.getElementById('siguiente_carta')


const muestraPuntuacion = () => {
  const elementoPuntuacion = document.getElementById('puntuacion')

  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `<h3>Tu puntuación es: <span>${puntuacion}</span></h3>`
  }
}

document.addEventListener('DOMContentLoaded', muestraPuntuacion)

const generarNumeroAleatorio = () => {
  return Math.floor(Math.random() * 10 + 1)
}

const quitarOchoyNueve = (numeroAleatorio) => {
  if (numeroAleatorio > 7) {
    numeroAleatorio += 2
  }
  return numeroAleatorio
}

const dameCarta = () => {
  const numeroAleatorio = generarNumeroAleatorio()
 return carta_dada = quitarOchoyNueve(numeroAleatorio)
}

const sumarPuntuacion = () => {
  if (carta_dada > 7) {
    puntuacion += 0.5
  } else {
    puntuacion += carta_dada
  }
}

function cogerImagenCarta() {
  return document.getElementById('carta')
}
function asignarImagenCartaNumeroCorrespondiente(imgCarta) {
  switch (carta_dada) {
    case 1:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg'
      break
    case 2:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg'
      break
    case 3:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg'
      break
    case 4:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg'
      break
    case 5:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg'
      break
    case 6:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg'
      break
    case 7:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg'
      break
    case 10:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg'
      break
    case 11:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg'
      break
    case 12:
      imgCarta.src =
        'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg'
      break
  }
}

const muestraCarta = () => {
  const imgCarta = cogerImagenCarta()
  asignarImagenCartaNumeroCorrespondiente(imgCarta)
}

const reiniciarJuego = () => {
  location.reload()
}
const gestionarPartida = () => {
  if (puntuacion <= 4.5) {
    mensajeResultado.innerHTML = `<p>Has sido muy conservador</p>`
    siguienteCarta.innerHTML = `<p>Hubieses sacado un ${dameCarta()}</p>`
  } else if (puntuacion >= 5 && puntuacion < 6) {
    mensajeResultado.innerHTML = `<p>Te ha entrado el canguelo eh?</p>`
    siguienteCarta.innerHTML = `<p>Hubieses sacado un ${dameCarta()}</p>`
  } else if (puntuacion >= 6 && puntuacion <= 7) {
    mensajeResultado.innerHTML = `<p>Casi casi..</p>`
    siguienteCarta.innerHTML = `<p>Hubieses sacado un ${dameCarta()}</p>`
  } else if (puntuacion === 7.5) {
    mensajeResultado.innerHTML = '¡ Lo has clavado! ¡Enhorabuena!'
    mensajeResultado.setAttribute('class', 'rainbow')
    confetti()
  }

  botonDarCarta.remove()
  containerBotones.innerHTML = `<button type="button" id="reiniciar">Nueva partida 🎇</button>`
  const botonReiniciar = document.getElementById('reiniciar')
  botonReiniciar.addEventListener('click', reiniciarJuego)
}

const gameOver = () => {
  if (puntuacion > 7.5) {
    mensajeResultado.innerHTML = `<p style='color:black; font-size: 3em; text-shadow: 0 0 20px #fff, 0 0 30px #fff, 0 0 50px #fff, 0 0 60px #fff, 0 0 70px #fff'>Game over!</p>`
    botonDarCarta.remove()
    containerBotones.innerHTML = `<button type="button" id="reiniciar">Nueva partida 🎇</button>`
  } else if (puntuacion === 7.5) {
    mensajeResultado.innerHTML = '¡ Lo has clavado! ¡Enhorabuena!'
    mensajeResultado.setAttribute('class', 'rainbow')
    confetti()
    botonDarCarta.remove()
    containerBotones.innerHTML = `<button type="button" id="reiniciar">Nueva partida 🎇</button>`
  }
  const botonReiniciar = document.getElementById('reiniciar')
  botonReiniciar.addEventListener('click', reiniciarJuego)
}

botonDarCarta.addEventListener('click', dameCarta)
botonDarCarta.addEventListener('click', sumarPuntuacion)
botonDarCarta.addEventListener('click', muestraPuntuacion)
botonDarCarta.addEventListener('click', muestraCarta)
botonDarCarta.addEventListener('click', gameOver)
botonParar.addEventListener('click', gestionarPartida)
botonParar.addEventListener('click', gameOver)
