import "./PostCard.css";
import { NavLink } from "react-router-dom";

const NewPostCard = () => {

    return (
        <NavLink to={`posts/create`} className={"postcard"}>
            <h3 className="postcard-title">Create New Post</h3>
        </NavLink>
    );
};

export default NewPostCard;