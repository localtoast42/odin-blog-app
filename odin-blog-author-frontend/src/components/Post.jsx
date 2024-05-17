import "./Post.css";
import { Form, Link, useLoaderData } from "react-router-dom";

const Post = () => {
    const { post } = useLoaderData();

    return (
        <div className="post">
            <h3 className="post-title">{post.title}</h3>
            <h2 className="post-author">{`by ${post.author}`}</h2>
            {post.isPublished ? <h2 className="post-date">{post.datePublished}</h2> : false}
            <p className="post-text">{post.text}</p>
            <Link to="edit">Edit</Link>
            <Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                    if (
                        !confirm("Do you really want to delete this post?")
                    ) {
                        event.preventDefault();
                    }
                }}
            >
                <button type="submit">Delete</button>
            </Form>
        </div>
    );
};

export default Post;