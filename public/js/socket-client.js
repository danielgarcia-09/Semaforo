const socket = io();
socket.on('cliente-conectado', data => {
    console.log(data)
})

socket.on('cliente-desconectado', data => {
    console.log(data);
})