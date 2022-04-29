// import express from 'express';
import express, { Application } from 'express';
import router from './routes';
// import express from 'express';
// const app = express();

const createApp = (): Application => {
    const app = express();

    // Middleware 
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Router base
    app.use('/api', router);

    return app;
}

export default createApp;