import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";




// const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => {
//         return {
//             ...prev,
//             name: value
//         }
//     })
// }


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    image: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateImage = (img) => {
    setForm((prevForm) => ({
      ...prevForm,
      image: img,
    }));
  };

  const api = import.meta.env.HGIM_API;

const generateImage = () => {
  setGeneratingImg(true);
  if (!form.prompt){
    alert("Please Enter Prompt")
    return
  }
  fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${api}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "inputs": form.prompt,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token');
        }
        throw new Error('Failed to generate image');
      }
      return res.blob();
    })
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        updateImage(base64data);
      };
      reader.readAsDataURL(blob);
    })
    .catch((err) => {
      console.error('Error generating image:', err);
    })
    .finally(() => {
      setGeneratingImg(false);
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.prompt && form.image && form.name){
      setLoading(true)
      try {
        const res = await fetch('http://localhost:8080/api/v1/post/create-post',{
          method:'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form)
      })

      await res.json();
      navigate('/');
      } catch (error) {
        console.log(error)
        alert(error)
      }
      finally{
        setLoading(false);
      }
    } else {
      alert('Please Enter fill the fields')
    }
  }


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt:randomPrompt})
  }





  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunnging images gemerated through Flux.1 AI share them with community.
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit} >
        <div className="flex flex-col gap-5">
            <FormField 
             labelName="Your Name"
             type="text"
             name="name"
             placeholder="Enter your name : John Jacop"
             value={form.name}
             handleChange={handleChange}
            />
            <FormField 
             labelName="Prompt"
             type="text"
             name="prompt"
             placeholder="A BBQ that is alive, in the style of a Pixar animated movie"
             value={form.prompt}
             handleChange={handleChange}
             isSurpriseMe
             handleSurpriseMe={handleSurpriseMe}
            />
            <div className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                {form.image ? (
                    <img 
                    src={form.image} 
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                     />
                ) : (
                    <img 
                    src={preview} 
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                     />
                )}

                {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)] rounded-lg">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
        <div className="mt-5 flex gap-5">
            <button 
            onClick={generateImage}
            type="button"
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                {generatingImg ? 'Generating...' : 'Genenerate'}
            </button>
        </div>
        <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]"> Once you have created the image you want, you can share it with others in the community</p>
            <button type="submit" className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                {loading ? "Sharing..." : "Share with the Community"}
            </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
