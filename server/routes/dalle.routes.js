import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { dallePost } from '../controllers/dalle.controller.js';


dotenv.config();

const router = express.Router();

router.route('/generate-images').post(dallePost);


export default router;