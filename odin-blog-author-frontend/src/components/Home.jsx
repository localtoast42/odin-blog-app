import "./Home.css";
import PostContainer from "./PostContainer";

const Home = () => {

    return (
        <div className="home-container">
            <PostContainer></PostContainer>
            <div className="sidebar"></div>
        </div>
    );
};

export default Home;