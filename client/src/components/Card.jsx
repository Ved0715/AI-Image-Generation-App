import React from 'react'

import { download } from '../assets'
import {downloadImage} from '../utils'

const Card = ({_id , name , prompt , image}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img 
      className='w-full h-auto object-cover rounded-xl'
      src={image}
      alt={prompt} 
      />
      <div  className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] p-5 rounded-md bg-opacity-30 backdrop-blur-sm'>
        <p className='text-md text-white overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='flex w-7 h-7 object-cover rounded-full bg-green-700 text-white justify-center items-center text-sm font-bold'>
              {name[0]}  
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button type='button' onClick={() => downloadImage(image , _id)} className='outline-none bg-transparent border-none'>
            <img src={download} alt="download-buttom" className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card