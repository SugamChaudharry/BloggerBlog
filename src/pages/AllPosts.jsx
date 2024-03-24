import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    
  return (
    <div className='w-full py-8' >
        <Container>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard  {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts