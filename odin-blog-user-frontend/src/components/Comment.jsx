import "./Comment.css";
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
    
    return (
        <div>
            <h2>{comment.author.firstName}</h2>
            <p>{comment.text}</p>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment;