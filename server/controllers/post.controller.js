import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();


cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECREAT 
});

export const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({
            sucess:true,
            posts
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Internal server Error",
            sucess:false,
        })
    }
}

export const createPost = async (req, res, next) => {
    const {name , prompt , image} = req.body;

    if(!name || !prompt || !image){
        return res.status(400).json({
            message:"All the fields are required",
            success:false,
        })
    }
    try {
        const photoUrl = await cloudinary.uploader
        .upload(image)
        .catch((err) => console.error('Error on Cloudinary Upload'))

        // console.log(photoUrl)
        // {
        //     asset_id: '1842858e3733ca969c00ba99c6664575',
        //     public_id: 'qc3qhhaaa2rl9dxtma0g',
        //     version: 1738209408,
        //     version_id: 'f5a03633e872697895790501a54a40b7',
        //     signature: 'c4b9992c769d6af04eff0a341c39218518d2a27a',
        //     width: 1024,
        //     height: 1024,
        //     format: 'jpg',
        //     resource_type: 'image',
        //     created_at: '2025-01-30T03:56:48Z',
        //     tags: [],
        //     bytes: 84765,
        //     type: 'upload',
        //     etag: 'db32fe935b29f823f6656ce2b470b777',
        //     placeholder: false,
        //     url: 'http://res.cloudinary.com/ddllbpmbp/image/upload/v1738209408/qc3qhhaaa2rl9dxtma0g.jpg',
        //     secure_url: 'https://res.cloudinary.com/ddllbpmbp/image/upload/v1738209408/qc3qhhaaa2rl9dxtma0g.jpg',
        //     asset_folder: '',
        //     display_name: 'qc3qhhaaa2rl9dxtma0g',
        //     api_key: '238347738248216'
        //   }
          

        const newPost = await Post.create({
            name,
            prompt,
            image: photoUrl.url,
        })
        res.status(201).json({
            message:"Post Created",
            success:true,
            data:newPost,
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
} 