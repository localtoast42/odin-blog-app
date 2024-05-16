import "./Home.css";
import "./PostContainer.css";
import PostCard from "./PostCard";
import NewPostCard from "./NewPostCard";
import { useLoaderData } from "react-router-dom";

const PostContainer = () => {
    const { posts } = useLoaderData();

    return (
        <div className="home-container">
            <div className="post-container">
                <NewPostCard />
                {posts.map(post => <PostCard 
                    key={post._id} 
                    post={post} />
                )}
            </div>
            <div className="sidebar">
                <h2>Description</h2>
                <p>This is my blog, check it out!</p>
            </div>
        </div>
    );
};

export default PostContainer;