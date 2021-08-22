let io = require("./socket").get();

const socketController = {};

io.on("connection", (socket) => {
    socket.on('red-client', (nada)=> {
      io.emit('red', {
        class: 'box3',
        glow: 'box3-on',
        color: 'red'
      });
    })

    socket.on('yellow-client', (nada)=> {
      io.emit('yellow', {
        class: 'box2',
        glow: 'box2-on',
        color: 'yellow'
      });
    })

    socket.on('green-client', (nada)=> {
      io.emit('green', {
        class: 'box1',
        glow: 'box1-on',
        color: 'green'
      });
    })
});

socketController.klk = (req, res) => {
  io.emit("server/random", Math.random());
  res.send("<h1>perfecto!</h1>");
};

module.exports = socketController;
