import "./Comment.css";
import PropTypes from 'prop-types';

const Comment = ({ comment, isAuthor }) => {
    
    return (
        <div className="comment-container">
            <div className="comment-header">
                <div className="comment-info">
                    <h3 className="comment-author">{comment.author.username}</h3>
                    <h3 className="comment-date">{comment.postDateFormatted}</h3>
                
                </div>
                {isAuthor && (
                    <div className="comment-btns">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
            </div>
            <p className="comment-text">{comment.text}</p>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    isAuthor: PropTypes.bool.isRequired
}

export default Comment;