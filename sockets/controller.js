const socketController = ( socket ) => {
    socket.broadcast.emit('cliente-conectado', `nuevo cliente, id: ${ socket.id }`);

    socket.on('disconnect', ()=> {
        socket.broadcast.emit('cliente-desconectado', `cliente desconectado, id: ${ socket.id }`);
    })
};

module.exports = {
    socketController
}