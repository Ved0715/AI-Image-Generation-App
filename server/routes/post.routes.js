import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';
import { createPost, getAllPost } from '../controllers/post.controller.js';

dotenv.config();

const router = express.Router();

router.route('/get-all-posts').get(getAllPost)
router.route('/create-post').post(createPost);




export default router;