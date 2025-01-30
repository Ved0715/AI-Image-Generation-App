import  filesaver from 'file-saver'

import { surpriseMePrompts } from '../constants' ;



export function getRandomPrompt(prompt) {
    const rendomPrompt =  surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];
    if(rendomPrompt === prompt) return getRandomPrompt(prompt);
    return rendomPrompt;
}


export async function downloadImage(image , _id ) {
    filesaver.saveAs(image , `download-${_id}.jpg`);
}