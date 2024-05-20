import "./Comment.css";
import { useState } from 'react';
import { Form } from "react-router-dom";

const NewComment = () => {
    const [isEditable, setIsEditable] = useState(false);

    function toggleEditable() {
        setIsEditable(!isEditable);
    }
    
    return (
        <>
            {!isEditable && <button className="new-comment-btn" onClick={toggleEditable}>+ New Comment</button>}
            {isEditable && 
                <div className="comment-container">
                    <Form 
                        method="post" 
                        action="comments/create" 
                        className="comment-edit"
                        onSubmit={toggleEditable}
                    >
                        <textarea
                            name="text"
                            id="comment-text"
                            placeholder="Write your comment..."
                            rows="4"
                            className="text-input">
                        </textarea>
                        <div className="comment-btns">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={toggleEditable}>Cancel</button>
                        </div>
                    </Form>
                </div>
            }
        </>
    )
}

export default NewComment;