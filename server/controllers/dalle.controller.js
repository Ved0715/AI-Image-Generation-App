import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';


dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

export const dallePost = async (req ,res , next) => {
    try {
        const { prompt } = req.body;
        if(!prompt){
            return res.status(400).json({
                message: 'Prompt is required',
                success: false
            });
        }
        console.log(prompt);
        const aiResponse = await openai.images.generate({
            model:'dall-e-2',
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json',
        });
        console.log(aiResponse)

        const img = aiResponse.data[0].b64_json;
        

        return res.status(200).json({
            image: img
        })
    } catch (error) {
        console.error(error)
    }
} 