import "./Post.css";
import { Form, useLoaderData, useNavigate } from "react-router-dom";

const PostEdit = () => {
    const { post } = useLoaderData();
    const navigate = useNavigate();

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
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </Form>
        </div>
    );
};

export default PostEdit;