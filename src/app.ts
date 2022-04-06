import createApp from './express/express';
import http from 'http';

const PORT = process.env.PORT || 8080;

// Conexión con el servidor
const connectedServer = async () => {
    const app = await createApp();

    const server = http.createServer(app).listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)
    });

    // Si ocurre un error
    server.on("error", error => console.log(`Error en el servidor ${error}`));
};
connectedServer();