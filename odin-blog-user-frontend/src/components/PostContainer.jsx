import "./PostContainer.css";
import PostCard from "./PostCard";
import { useLoaderData } from "react-router-dom";

const PostContainer = () => {
    const { posts } = useLoaderData();
    const publishedPosts = posts.filter(post => post.isPublished);

    return (
        <div className="home-container">
            <div>
                <div className="post-container">
                    {publishedPosts.map(post => <PostCard
                        key={post.id}
                        post={post} />
                    )}
                </div>
            </div>
            <div className="sidebar">
                <h2>Description</h2>
                <p>This is my blog, check it out!</p>
            </div>
        </div>
    );
};

export default PostContainer;