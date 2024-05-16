import "./Post.css";

const NewPost = () => {

    return (
        <div className="post">
            <form method="POST" action="http://localhost:3000/api/v1/posts/" className="post-edit">
                <input
                    type="text"
                    name="title"
                    id="post-title"
                    placeholder="Title" 
                    className="title-input"/>
                <textarea
                    name="text"
                    id="post-text"
                    placeholder="Write your post..."
                    rows="10" cols="33"
                    className="text-input">
                </textarea>
                <button name="save" className="save-btn">Save</button>
            </form>
        </div>
    );
};

export default NewPost;