import App from "./App";
import PostContainer from "./components/PostContainer";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import { postLoader, postContainerLoader } from "./loaders";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { 
                index: true, 
                element: <PostContainer />,
                loader: postContainerLoader 
            },
            { 
                path: "/posts/:postId", 
                element: <Post />,
                loader: postLoader 
            },
            { 
                path: "/posts/create", 
                element: <NewPost /> 
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
];

export default routes;