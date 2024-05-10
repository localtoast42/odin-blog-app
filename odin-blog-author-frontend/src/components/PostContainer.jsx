import "./PostContainer.css";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostContainer = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/posts/`, { mode: "cors" })
            .then((response) => response.json())
            .then((response) => setPostList(response))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="post-container">
            {postList.map(post => <PostCard 
                key={post._id} 
                post={post} />
            )}
        </div>
    );
};

export default PostContainer;