import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'


function EditPost() {
    const [post, setPost] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='w-full py-8' >
        <Container>
            <PostCard post={post} />
        </Container>
    </div> 
  ) : null
  
}

export default EditPost