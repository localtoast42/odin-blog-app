import App from "./App";
import Home from "./components/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
        { index: true, element: <Home /> },
    ],
  },
];

export default routes;