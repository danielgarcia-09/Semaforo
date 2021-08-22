const socket = io();

const iniciar = document.querySelector('#iniciar').addEventListener('click', ()=> {
    console.log('inicio coño');
})

const d = document.getElementById("f");
const div = document.getElementById("v");

document.addEventListener("DOMContentLoaded", (e) => {
    

    setInterval(()=> {
        
        setTimeout(()=> {

            socket.emit('green-client', '');
            
            setTimeout(()=> {
    
                socket.emit('yellow-client', '');
    
                setTimeout(()=> {
    
                    socket.emit('red-client', '')
    
                }, 1000 * 2);
    
            }, 1000 * 3)
    
        }, 1000 * 5)   

    }, 1000 * 10)

})

socket.on('red', data =>{
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('yellow', data =>{
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})

socket.on('green', data =>{
    emptyTraffic()
    let box = document.querySelector(`.${data.class}`)
    box.classList.add(data.glow);
    div.style.background = data.color;
})


const emptyTraffic = () => {
    let boxes = document.querySelectorAll('.box-item');
    for(let i = 0; i < boxes.length; i++ ) {
        boxes[i].classList.remove(`box${i+1}-on`);
    }
}