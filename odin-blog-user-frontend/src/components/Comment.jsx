import "./Comment.css";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form } from "react-router-dom";

const Comment = ({ comment, isAuthor }) => {
    const [isEditable, setIsEditable] = useState(false);

    function toggleEditable() {
        setIsEditable(!isEditable);
    }
    
    return (
        <div className="comment-container">
            <div className="comment-header">
                <div className="comment-info">
                    <h3 className="comment-author">{comment.author.username}</h3>
                    <h3 className="comment-date">{comment.postDateFormatted}</h3>
                </div>
                {isAuthor && (
                    <div>
                        {!isEditable && <button onClick={toggleEditable}>Edit</button>}
                        {isEditable && 
                            <Form 
                                method="post" 
                                action={`comments/${comment.id}/delete`}
                                onSubmit={(event) => {
                                    if (
                                        !confirm("Do you really want to delete this comment?")
                                    ) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                <button>Delete</button>
                            </Form>
                        }
                    </div>
                )}
            </div>
            {!isEditable && <p className="comment-text">{comment.text}</p>}
            {isEditable && 
                <Form method="post" action={`comments/${comment.id}/edit`} className="comment-edit">
                    <textarea
                        name="text"
                        id="comment-text"
                        placeholder="Write your comment..."
                        rows="4"
                        defaultValue={comment.text ? comment.text : ''}
                        className="text-input">
                    </textarea>
                    <div className="comment-btns">
                        <button type="submit">Save</button>
                        <button type="button" onClick={toggleEditable}>Cancel</button>
                    </div>
                </Form>}
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    isAuthor: PropTypes.bool.isRequired
}

export default Comment;