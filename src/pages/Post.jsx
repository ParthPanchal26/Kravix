import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/kravix/");
            });
        } else navigate("/kravix/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/kravix/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-700">
            <Container>
                <div className="relative sm:p-12 mt-10 sm:mt-0">
                    <div className="w-full bg-gray-800 flex justify-center mb-4 rounded-xl p-6">

                        {isAuthor && (
                            <div className="absolute sm:right-12 -top-14 sm:top-0">
                                <Link to={`/kravix/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3 w-40 hover:bg-green-600">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="w-40 hover:bg-red-600">
                                    Delete
                                </Button>
                            </div>
                        )}

                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-4/5"
                        />


                    </div>
                    <div className="bg-gray-800 p-6 rounded-md w-full mb-6">
                        <h1 className="text-slate-300 p-3 rounded-md text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="bg-gray-800 p-6 text-slate-300 rounded-md browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}