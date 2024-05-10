import "./PostCard.css";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {

    return (
        <NavLink to={`posts/${post._id}`}>
            <h3>{post.title}</h3>
            <h2>{post.author.firstName + ' '  + post.author.lastName}</h2>
            {post.publishedDate ? <h2>{post.publishedDate}</h2> : false}
        </NavLink>
    );
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostCard;