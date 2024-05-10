import "./Post.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
    const [post, setPost] = useState({});
    const [editable, setEditable] = useState(false)

    const { postId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/posts/${postId}`, { mode: "cors" })
            .then((response) => response.json())
            .then((response) => setPost(response))
            .catch((error) => console.error(error));
    }, [postId]);

    function handleEditToggle() {
        setEditable(!editable);
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
            <form onSubmit={handleSubmit} className="post-edit">
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
        );
    } else {
        return (
            <div className="post">
                <h3 className="post-title">{post.title}</h3>
                <h2 className="post-info">{post.author + ' ' + post.datePublished}</h2>
                <p className="post-text">{post.text}</p>
                <button onClick={handleEditToggle}>Edit</button>
            </div>
        );
    }
};

export default Post;