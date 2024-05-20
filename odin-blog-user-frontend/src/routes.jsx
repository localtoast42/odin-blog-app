import App from "./App";
import PostContainer from "./components/PostContainer";
import Post from "./components/Post";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import { postLoader, postContainerLoader, userLoader } from "./loaders";
import { logoutAction, commentCreateAction } from "./actions";

const routes = [
    {
        path: "/",
        element: <App />,
        loader: userLoader,
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
                path: "/posts/:postId/comments/create", 
                action: commentCreateAction 
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/logout",
        action: logoutAction 
    },
];

export default routes;