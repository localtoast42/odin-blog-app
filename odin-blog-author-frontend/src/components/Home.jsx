import "./Home.css";
import PostContainer from "./PostContainer";

const Home = () => {

    return (
        <div className="home-container">
            <PostContainer></PostContainer>
            <div className="sidebar">
                <h2>Description</h2>
                <p>This is my blog, check it out!</p>
            </div>
        </div>
    );
};

export default Home;