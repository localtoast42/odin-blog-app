import App from "./App";
import PostContainer from "./components/PostContainer";
import Post from "./components/Post";
import PostEdit from "./components/PostEdit";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import { postLoader, postContainerLoader, userLoader } from "./loaders";
import { loginAction, logoutAction, postCreateAction, postUpdateAction, postDeleteAction } from "./actions";

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
                path: "/posts/:postId/edit", 
                element: <PostEdit />,
                loader: postLoader,
                action: postUpdateAction 
            },
            { 
                path: "/posts/:postId/delete", 
                action: postDeleteAction 
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
        action: loginAction
    },
    {
        path: "/logout",
        action: logoutAction 
    },
];

export default routes;