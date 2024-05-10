import App from "./App";
import Home from "./components/Home";
import Post from "./components/PostContainer";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "/posts/:id", element: <Post /> },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
];

export default routes;