import "./Comment.css";
import { Form } from "react-router-dom";

const NewComment = () => {
    
    return (
        <div>
            <Form method="post" action="comments/create" className="comment-edit">
                <textarea
                    name="text"
                    id="comment-text"
                    placeholder="Write your comment..."
                    rows="4"
                    className="text-input">
                </textarea>
                <div className="comment-btns">
                    <button type="submit">Submit</button>
                </div>
            </Form>
        </div>
    )
}

export default NewComment;