import "./Post.css";

const NewPost = () => {
    async function handleSubmit(e) {
        e.preventDefault();

        const newPost = {
            title: e.target.title.value,
            text: e.target.text.value,
        };

        await fetch(`http://localhost:3000/api/v1/posts/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
        });
    }

    return (
        <form onSubmit={handleSubmit} className="post-edit">
            <input 
                type="text" 
                name="title" 
                id="post-title" 
                placeholder="Title"/>
            <textarea 
                name="text" 
                id="post-text"
                placeholder="Write your post...">
            </textarea>
            <button name="save">Save</button>
        </form>
    );
};

export default NewPost;