import "./Post.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
    const [post, setPost] = useState([]);

    const { postId } = useParams();

    useEffect(() => {
        fetch(`https://<tempurl>/api/v1/posts/${postId}`, { mode: "cors" })
            .then((response) => response.json())
            .then((response) => setPost(response))
            .catch((error) => console.error(error));
    }, [postId]);

    return (
        <div className="post">
            <h3 className="post-title">{post.title}</h3>
            <h2 className="post-info">{post.author + ' ' + post.datePublished}</h2>
            <p className="post-text">{post.text}</p>
        </div>
    );
};

export default Post;