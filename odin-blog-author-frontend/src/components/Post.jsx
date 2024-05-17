import "./Post.css";
import { Link, useLoaderData } from "react-router-dom";

const Post = () => {
    const { post } = useLoaderData();

    return (
        <div className="post">
            <h3 className="post-title">{post.title}</h3>
            <h2 className="post-author">{`by ${post.author}`}</h2>
            {post.isPublished ? <h2 className="post-date">{post.datePublished}</h2> : false}
            <p className="post-text">{post.text}</p>
            <Link to="edit">Edit</Link>
            <button>Delete</button>
        </div>
    );
};

export default Post;