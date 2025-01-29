import React , {useState , useEffect} from 'react'
import { Loader, FormField , Card } from '../components'


import { Header } from '../components';


const ReactCard =({data , title}) => {
    if(data?.length >0) {
        return data.map((post) => <Card key={post._id} {...post} />)
    }
    return (<h2 className='font-bold text-[#6449ff] text-xl mt-5 uppercase'>{title}</h2>)
}

const Home = () => {
    const [loading , setLoading] = useState(false);
    const [allPosts , setAllPosts] = useState(null);
    const [searchText , setSearchText] = useState('');

  return (
    <section className='max-w-7xl mx-auto'>
        <Header />
        <div className="mt-16">
            <FormField />
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
                            <ReactCard data={[]} title='No results found' />
                        ) : (
                            <ReactCard data={[]} title='No Post Found' />
                        )}
                    </div>
                </>
            )}
        </div>
    </section>
    )
}

export default Home