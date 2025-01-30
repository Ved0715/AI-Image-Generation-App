import React , {useState , useEffect} from 'react'
import { Header , Loader, FormField , Card } from '../components'



const RenderCard =({data , title}) => {
    if(data?.length >0) {
        return data.map((post) => <Card key={post._id} {...post} />)
    }
    return (<h2 className='font-bold text-[#6449ff] text-xl mt-5 uppercase'>{title}</h2>)
}

const Home = () => {
    const [loading , setLoading] = useState(false);
    const [allPosts , setAllPosts] = useState(null);
    const [searchText , setSearchText] = useState('');
    const [searchTimeout ,setSearchTimeout] = useState(null);
    const [searchResults , setSearchResults] = useState(null);


      useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          try {
            const res = await fetch('http://localhost:8080/api/v1/post/get-all-posts',{
              method:'GET',
              headers:{
                "Content-Type": 'application/json',
              },
            });
            // [
            //     {
            //       _id: new ObjectId('679af881cc5114e5bd02ce5f'),
            //       name: 'Vedant Narwade',
            //       prompt: 'A BBQ that is alive, in the style of a Pixar animated movie',
            //       image: 'http://res.cloudinary.com/ddllbpmbp/image/upload/v1738209408/qc3qhhaaa2rl9dxtma0g.jpg',
            //       __v: 0
            //     }
            //   ]
            if (res.ok) {
              const result = await res.json();
              if(!result){
                throw new Error('Result not defined');
              }
              setAllPosts(result.posts.reverse())
            }
    
          } catch (error) {
            alert(error)
          } finally {
            setLoading(false)
          }
        }
        fetchPosts();
      },[]);


      const handleSearchChange =(e) => {
        clearTimeout(searchTimeout);

        setSearchText(e.target.value);

        setSearchTimeout(
          setTimeout(() => {
            const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchResults(searchResults);
          }, 500)
        );
      }





  return (
    <section className='max-w-7xl mx-auto'>
        <Header />
        <div className="mt-10">
            <FormField 
            labelName="Search Post"
            name="text"
            type='text'
            placeholder="Search Post"
            value={searchText}
            handleChange={handleSearchChange}
            />
        </div>
        <div className="mt-10">
            {loading ? (
            <div className='flex justify-center items-center h-[300px]'>
                <Loader />
            </div> 
            ) : (
                <>
                    {searchText && (
                        <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                            Showing results for <span className='text-[#222328]'>{searchText}</span>
                        </h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-col-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText ? (
                            <RenderCard data={searchResults} title='No results found' />
                        ) : (
                            <RenderCard data={allPosts} title='No Post Found' />
                        )}
                    </div>
                </>
            )}
        </div>
    </section>
    )
}

export default Home