import "./PostContainer.css";
import PostCard from "./PostCard";
import { Form, useLoaderData } from "react-router-dom";

const PostContainer = () => {
    const { posts } = useLoaderData();
    const publishedPosts = posts.filter(post => post.isPublished);
    const draftPosts = posts.filter(post => !post.isPublished);

    return (
        <div className="home-container">
            <div>
                <h2 className="drafts-header">Drafts</h2>
                <div className="post-container">
                    {draftPosts.map(post => <PostCard
                        key={post.id}
                        post={post} />
                    )}
                </div>
                <h2>Published</h2>
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
                <Form method="POST" action="posts/create">
                    <button type="submit" className="post-btn">Create New Post</button>
                </Form>
            </div>
        </div>
    );
};

export default PostContainer;