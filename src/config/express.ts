import compression from 'compression';
import MongoStore from 'connect-mongo';
import express, { Application } from 'express';
import session from 'express-session';
import passport from 'passport';
import { router } from '../routes';

export const createApp = (): Application => {
  const app = express();

  app.use(compression());

  app.use(express.static('public'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: 'foo',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 10,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: 'ecommerce',
        collectionName: 'sessions',
      }),
    })
  );

  app.use(passport.authenticate('session'));

  app.use('/api', router);

  app.get('/health', (_req, res) => {
    res.send('Running 1');
  });

  return app;
};
