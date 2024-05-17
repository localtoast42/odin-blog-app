import "./PostCard.css";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {

    return (
        <NavLink to={`posts/${post.id}`} className={"postcard"}>
            <div className="postcard-header">
                <h2 className="postcard-author">{post.author}</h2>
                {post.isPublished ? <h2 className="postcard-date">{post.publishedDateFormatted}</h2> : false}
            </div>
            <h3 className="postcard-title">{post.title}</h3>
        </NavLink>
    );
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostCard;