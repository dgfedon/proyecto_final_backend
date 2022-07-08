import './config/passport';
import { createApp } from './config/express';
import http from 'http';
import { connectDb } from './config/db';
import dotenv from 'dotenv';
import { cpus } from 'os';
import minimist from 'minimist';
import cluster from 'cluster';

dotenv.config();

const totalCPUs = cpus().length;

const args = minimist(process.argv.slice(2));

const PORT = process.env.PORT || args.port || 3001;

// Conexión con el servidor
const connectedServer = async () => {
    try {
        const app = await createApp();

        const server = http.createServer(app).listen(PORT, () => {
            console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)
        });

        // Si ocurre un error
        server.on("error", error => console.log(`error en el servidor ${error}`));
    } catch (error) {}
};

const MODE = process.env.MODE || 'FORK';

if (MODE === 'CLUSTER' && cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
    });
} else {
    connectedServer().catch((error) => console.log(error));   
};