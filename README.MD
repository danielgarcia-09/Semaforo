# Simulacion IoT de Semáforo

Esta es una app para simular una solución de IoT al problemas de los peatones con los semáforos en las vías publicas.

Utilizamos socket.io para conectar el semáforo simulado con el controlador del telefono, el telefono emite un evento que es capturado por el servidor y su respuesta es capturada por el semaforo, es una conexion continua asi que se hace en tiempo real sin tener que recargar ninguno de los dos modulos


| Controlador | Semáforo |
| ----------- | -------- |
| *Aqui podemos ver la vista del control, algo simple con boton de iniciar y uno de cancelar y el area gris es donde se puede ver el contador, tambíen cuenta con un módulo de voz para las personas discapacitadas* | *Este es el semáforo simulado* |
| ![Vista del controlador](./cellphone.png) | ![Vista del Semáforo](./lights.png) |

### Link del semaforo: https://comunicacion-socketio.herokuapp.com/
### Link del controlador: https://comunicacion-socketio.herokuapp.com/cellphone.html

