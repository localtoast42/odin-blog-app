import "./Post.css";
import { Form, useLoaderData } from "react-router-dom";

const PostEdit = () => {
    const { post } = useLoaderData();

    return (
        <div className="post">
            <Form method="POST" className="post-edit">
                <input
                    type="text"
                    name="title"
                    id="post-title"
                    placeholder="Title"
                    defaultValue={ post ? post.title : '' } 
                    className="title-input"/>
                <textarea
                    name="text"
                    id="post-text"
                    placeholder="Write your post..."
                    defaultValue={ post ? post.text : '' }
                    rows="10" cols="33"
                    className="text-input">
                </textarea>
                <button type="submit" name="save" className="save-btn">Save</button>
                {post.isPublished ? false : <button type="submit" name="publish">Publish</button>}        
                <button type="button">Cancel</button>
            </Form>
        </div>
    );
};

export default PostEdit;