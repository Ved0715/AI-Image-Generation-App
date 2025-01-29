import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';


import connectDB from './mongodb/connect.js';
import postRoutes from './routes/post.routes.js'
import dalleRoutes from './routes/dalle.routes.js'

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/' , async (req , res , next) => {
    res.send('Hello from DALL-E!');
})




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
