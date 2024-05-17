import App from "./App";
import PostContainer from "./components/PostContainer";
import Post from "./components/Post";
import PostEdit from "./components/PostEdit";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import { postLoader, postContainerLoader } from "./loaders";
import { postCreateAction, postUpdateAction } from "./actions";

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
                path: "/posts/:postId/edit", 
                element: <PostEdit />,
                loader: postLoader,
                action: postUpdateAction 
            },
            { 
                path: "/posts/create", 
                element: <PostEdit />,
                action: postCreateAction
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