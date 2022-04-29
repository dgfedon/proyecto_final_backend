import createApp from './config/express';
import connectDB from './config/db';
import http from 'http';

// import dotenv from 'dotenv';

// dotenv.config();

const PORT = process.env.PORT || 8080;

// Conexión con el servidor
const connectedServer = async () => {

    connectDB().catch(error => console.log(error));

    const app = await createApp();

    const server = http.createServer(app).listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)
    });

    // Si ocurre un error
    server.on("error", error => console.log(`Error en el servidor ${error}`));
};
connectedServer();