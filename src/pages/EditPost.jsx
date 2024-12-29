import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components/index'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {

    const [posts, setPosts] = useState(null);
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(slug)
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