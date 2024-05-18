import './App.css'
import { UserContext } from "./UserContext";
import { Outlet, NavLink, useLoaderData } from "react-router-dom";

function App() {
    const { user } = useLoaderData();

    return (
        <>
            <nav className='navbar'>
                <NavLink to="">Home</NavLink>
                {user ? (
                    <a href="http://localhost:3000/api/v1/logout">Sign out</a>
                ) : (
                    <NavLink to="login">Sign in</NavLink>
                )}
            </nav>
            <div className='content'>
                <UserContext.Provider value={ user }>
                    <Outlet />
                </UserContext.Provider>
            </div>
        </>
    )
}

export default App
