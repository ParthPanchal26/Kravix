import { useState, useParams, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components/index'
import { useNavigate } from 'react-router-dom';

const EditPost = () => {

    const [posts, setPosts] = useState([]);
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPosts(post)
                }   
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return posts ? (
        <div className="py-8">
            <Container>
                <PostForm post={posts} />
            </Container>
        </div>
    ) : null
}

export default EditPost