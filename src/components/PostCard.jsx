import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage }) => {

    return (
        <Link to={`/kravix/post/${$id}`}>
            <div style={{width: "365px"}} className='h-96 bg-gray-800 text-slate-200 border rounded-xl py-8 px-5 drop-shadow-md transition hover:drop-shadow-xl'>
                <div className='w-full justify-center h-40 mb-4 overflow-hidden'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-md' />
                </div>
                <h2 className='text-xl border-t-2 font-bold text-justify overflow-auto max-h-36 sm:overflow-auto p-2'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard