import "./Post.css";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Form, useLoaderData } from "react-router-dom";

const Post = () => {
    const user = useContext(UserContext)
    const { post, comments } = useLoaderData();

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-info">
                    <h3 className="post-title">{post.title}</h3>
                    <h2 className="post-author">{`by ${post.author}`}</h2>
                    {post.isPublished ? <h2 className="post-date">{post.publishedDateFormatted}</h2> : false}
                </div>
                <div className="post-btns">
                    <Form action="edit">
                        <button type="submit" className="post-btn">Edit</button>
                    </Form>
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
                        <button type="submit" className="post-btn">Delete</button>
                    </Form>
                </div>
            </div>
            <p className="post-text">{post.text}</p>
            <div className="comments">
                <NewComment></NewComment>
                {comments && comments.map(comment => <Comment
                    key={comment.id}
                    comment={comment}
                    isAuthor={comment.author._id===user.id}
                    isAdmin={user.isAuthor} />
                )}
            </div>
        </div>
    );
};

export default Post;