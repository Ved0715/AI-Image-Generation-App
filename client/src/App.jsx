import React from 'react'
import { BrowserRouter, Link , Route , Routes } from 'react-router-dom';

import {logo} from './assets';
import NotFound from './pages/NotFound';
import {Home, CreatePost} from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/' className='flex flex-row justify-center items-center'>
          <img src={logo} alt="logo" className='w-9 object-contain' />
          <p className='text-2xl font-bold text-[#6469ff] ml-5'>Flux1</p>
        </Link>
        <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Create
        </Link>
      </header>
      <main className='sm:p-8 p-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App