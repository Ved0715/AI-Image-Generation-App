import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';


import connectDB from './mongodb/connect.js';
import postRoutes from './routes/post.routes.js'

import { notFound } from './controllers/404.controller.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post', postRoutes);
// app.use('/api/v1/dalle', dalleRoutes);

app.get(notFound)




const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log("Server has started on port http://localhost:8080")
        })
    } catch (err) {
        console.error(err);
    }
}
startServer();
