const socket = io();

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
                
                socket.emit('red-client', '')
               

                //todo Para cambiar a amarillo
                setTimeout(()=> {
                    
                    socket.emit('yellow-client', '');
                
                }, 1000 * (time))

            }, 1000 * (time));

        }, 1000 * (time))

    }, 1000 * time)   
}

// * Timer principal
let timer = setInterval(()=> {
        
    startTraffic();

}, 1000 * 32)

// * Funcion para parar intervalo
function StopTimer() {
    clearInterval(timer);
}

// * Botones para pedir paso y cancelar
const iniciar = document.querySelector('#iniciar');
const cancelar = document.querySelector('#cancelar');
iniciar.addEventListener('click', ()=> {

    StopTimer();
    socket.emit('stop', '');
    emptyTraffic();

    let boxes = document.querySelectorAll('.box-item');
    
    boxes[1].classList.add('box2-on');
    div.style.background = 'yellow';
    setTimeout(()=> {
        
        //! Para cambiar a rojo
        setTimeout(()=> {
            
            boxes[1].classList.remove('box2-on');
            boxes[2].classList.add('box3-on');
            div.style.background = 'red';

        }, 1000 * 10);

    }, 1000 * 10)
    
    console.log('klk');    
    
    iniciar.disabled = true;
    cancelar.disabled = false;
});

cancelar.addEventListener('click', ()=> {
    socket.connect();
    timer = setInterval(()=> {
        
        startTraffic(15);
        
    }, 1000 * 61)
    iniciar.disabled = false;
})


// * Cuadro principal
const div = document.getElementById("v");


// * Listeners de socket.io
socket.on('red', data =>{
    console.log('red')
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('yellow', data =>{
    console.log('yellow')
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('green', data =>{
    console.log('green')
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

