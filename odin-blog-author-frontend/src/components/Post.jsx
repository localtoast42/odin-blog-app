import "./Post.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Post = () => {
    const [editable, setEditable] = useState(false)

    const { post } = useLoaderData();

    function handleEditToggle() {
        setEditable(!editable);
    }

    async function handleDelete() {
        await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
            mode: "cors",
            credentials: "include",
            method: 'DELETE' 
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newPost = {
            id: postId,
            title: e.target.title.value,
            text: e.target.text.value,
        };

        if (e.target.publish) {
            newPost.isPublished = true;
            newPost.publishedDate = Date.now();
        }

        await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
        });

        setEditable(!editable);
    }

    if (editable) {
        return (
            <div className="post">
                <form className="post-edit">
                    <input
                        type="text"
                        name="title"
                        id="post-title"
                        value={ post.title ? post.title : '' }
                        placeholder="Title"/>
                    <textarea
                        name="text"
                        id="post-text"
                        value={ post.text ? post.text : '' }
                        placeholder="Write your post...">
                    </textarea>
                    <button name="save">Save</button>
                    {post.isPublished ? false : <button name="publish">Publish</button>}
                </form>
            </div>
        );
    } else {
        return (
            <div className="post">
                <h3 className="post-title">{post.title}</h3>
                <h2 className="post-author">{`by ${post.author}`}</h2>
                {post.isPublished ? <h2 className="post-date">{post.datePublished}</h2> : false}
                <p className="post-text">{post.text}</p>
                <button onClick={handleEditToggle}>Edit</button>
                <button >Delete</button>
            </div>
        );
    }
};

export default Post;