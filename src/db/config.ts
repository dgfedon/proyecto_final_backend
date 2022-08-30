import MongoStore from 'connect-mongo';
import admin from 'firebase-admin';
import { config } from '../db/firebase-config';
import 'dotenv/config'

let serviceAccount = config;


// Configuration for firebase
export const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://coderhouse-backend-ecommerce.firebase.io.com',
}

// Configuration for Mongo
export const mongoDbConfig: { url: string, config: any } = {
    url: process.env.MONGO_URL as string,
    config: {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
}

export const sessionOption = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL as string,
        ttl: 10 * 60
    }),
    secret: 'mongosecretexample',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
} 