let imagenes = [
    {
    "url": "/portfolio/templates/img/imagen-logotipo.png",
    "nombre": "Abrahams Nieves",
    "descripcion": "Software Developer Portfolio"

    },

    {
        "url": "/portfolio/templates/img/foto-preview-stocky.png",
        "nombre": "Stocky",
        "descripcion": "imagen de ejemplo para desarrollar el carrusel"
    },
        {
        "url": "/portfolio/templates/img/backboard-preview.png",
        "nombre": "Backboard",
        "descripcion": "imagen de ejemplo para desarrollar el carrusel"
    },
        {
        "url": "/portfolio/templates/img/imagen-pokeApi.png",
        "nombre": "PokeApi",
        "descripcion": "imagen de ejemplo para desarrollar el carrusel"
    },
]

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagenContainer = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let presentacion = document.querySelector('.presentacion')

let actual = 0
const Duracion_Transicion = 500;
const Tiempo_Automatico = 2000;

actualizarCarrusel()

function actualizarCarrusel(direccion){
    const imagenVieja = imagenContainer.querySelector('img');

    /*Es un condicional : si la direccion es igual a 'next' va a un lado, de lo contrario va al otro */
    let claseEntrada = direccion === 'next' ? 'slide-in-right' : 'slide-in-left';
    let claseSalida = direccion === 'next' ? 'slide-out-left' : 'slide-out-right';

    if (imagenVieja){
        imagenVieja.classList.add(claseSalida);
    }
    setTimeout(() =>{
        imagenContainer.innerHTML = `
            <img class="img ${claseEntrada}" src="${imagenes[actual].url}" alt="${imagenes[actual].nombre}">
        `;

        texto.innerHTML = `
            <h3>${imagenes[actual].nombre}</h3>
        `;

        posicionCarrusel();

// Pequeño delay para que el navegador detecte la clase de entrada antes de activar la transición
        setTimeout(() =>{
            const nuevaImagen = imagenContainer.querySelector('img');
            if (nuevaImagen){
                nuevaImagen.classList.remove(claseEntrada);
                nuevaImagen.classList.add('active');
            }
        },20);
    },50);  // Tiempo mínimo para que se sienta fluido
}

function avanzarImagen(){
    actual = (actual + 1) % imagenes.length;
    actualizarCarrusel('next')
}

function retrocederImagen(){
    actual = (actual - 1 + imagenes.length) % imagenes.length;
    actualizarCarrusel('prev')
}

actualizarCarrusel('next');

let intervaloAutomatico = setInterval(avanzarImagen, Tiempo_Automatico);

presentacion.addEventListener('click', function(){
    clearInterval(intervaloAutomatico);
});

atras.addEventListener('click', function(){
    clearInterval(intervaloAutomatico);
    retrocederImagen();
    intervaloAutomatico = setInterval(retrocederImagen, Tiempo_Automatico);
});

adelante.addEventListener('click', function(){
    clearInterval(intervaloAutomatico);
    avanzarImagen();
    intervaloAutomatico = setInterval(avanzarImagen, Tiempo_Automatico);
});


function posicionCarrusel() {
    puntos.innerHTML = ""
    for (var i = 0; i <imagenes.length; i++){
        if(i == actual){
            puntos.innerHTML += '<p class="bold">.<p>'
        }
        else{
            puntos.innerHTML += '<p>.<p>'
        }
    }
}

const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('active');

        }else {
            //la animación se repita cada vez que subes y bajas.
            entry.target.classList.remove('active');
        }
    });
},{
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
});

//Selecciona todos los elementos que tengab un 'reveal' y lo observamos
const elementosAAnimar = document.querySelectorAll('.reveal');
elementosAAnimar.forEach((el) => observer.observe(el));