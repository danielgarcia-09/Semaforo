const socket = io();

// * Variable global que toma el intervalo del contador
let intervalCounter;

// * Contador
let count = document.querySelector('#count');  

// * Cuadro principal
const div = document.getElementById("v");

// * Partes del semaforo
let boxes = document.querySelectorAll('.box-item');

// * Timer principal
let timer = setInterval(()=> {
        
    startTraffic();

}, 1000 * 32)

// * Funcion para parar intervalo
function StopTimer() {
    clearInterval(timer);
}

// * Botones para pedir paso y cancelar
let iniciar = document.querySelector('#iniciar');
let cancelar = document.querySelector('#cancelar');

iniciar.addEventListener('click', ()=> {

    StopTimer();
    emptyTraffic();
    socket.emit('stop', '');
    
    boxes[1].classList.add('box2-on');
    div.style.background = 'yellow';

    UpdateCounter();
    VoiceCountdown();
    

    //! Para cambiar a rojo
    setTimeout(()=> {
        StopCounter();
        boxes[1].classList.remove('box2-on');
        boxes[2].classList.add('box3-on');
        div.style.background = 'red';

    }, 1000 * 10);
 
    
    iniciar.disabled = true;
    cancelar.disabled = false;
});

cancelar.addEventListener('click', ()=> {
    
    VoiceCountdown( true );
    emptyTraffic();
    StopCounter();
    socket.connect();
    timer = setInterval(()=> {
        
        startTraffic(15);
        
    }, 1000 * 61)
    iniciar.disabled = false;
    cancelar.disabled = true;
})


document.addEventListener("DOMContentLoaded", (e) => {

    startTraffic();

});

// * Varios timeout para simular el semaforo
const startTraffic = (time = 8) => {
    
    socket.emit('green-client', '');        
    
    // * para cambiar a verde
    setTimeout(()=> {

        socket.emit('green-client', '');        

        //todo Para cambiar a amarillo
        setTimeout(()=> {
           

            socket.emit('yellow-client', '');

            //! Para cambiar a rojo
            setTimeout(()=> {
                
                iniciar.disabled = true;
                socket.emit('red-client', '')

                //todo Para cambiar a amarillo
                setTimeout(()=> {
                    
                    iniciar.disabled = false;
                    socket.emit('yellow-client', '');
                
                }, 1000 * (time))

            }, 1000 * (time));

        }, 1000 * (time))

    }, 1000 * time)   
}



// * Listeners de socket.io
socket.on('red', data =>{
    // console.log('red')
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('yellow', data =>{
    // console.log('yellow')
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('green', data =>{
    // console.log('green')
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

// * Funcion para limpiar el semaforo antes de que cambie
const emptyTraffic = () => {
    let boxes = document.querySelectorAll('.box-item');
    for(let i = 0; i < boxes.length; i++ ) {
        boxes[i].classList.remove(`box${i+1}-on`);
    }
}

// * Variable para la voz
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

// *  Array global para las voces
let voices = [];

// * Aqui asignamos las voces a la variable voices
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
}

// * Aqui iniciamos el conteo usando la voz
const VoiceCountdown = ( stop = false) => {
    
    for(let i = 10; i >= 1 ; i-- ) {
        let speak = new SpeechSynthesisUtterance(i);
        speak.lang = 'es-DO';
        speak.voice = voices[4];
        
        if(stop) {
            window.speechSynthesis.cancel();
        }else{
            window.speechSynthesis.speak(speak);
        }
        
    }
}

// * Aqui actualizamos el contador de la pantalla al iniciar el conteo
const UpdateCounter = ( ) => {
    
    let i = 10;

    intervalCounter = setInterval(()=>{
        
        count.innerHTML = i;
        i--;

    },1000);
   
        
    
}

// * Esta funcion se utiliza al cancelar, para parar el UpdateCounter
const StopCounter = () => {
    clearInterval(intervalCounter);
    count.innerHTML = ''; 
}