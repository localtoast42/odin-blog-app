import './App.css'
import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";

function App() {

    const [user, setUser] = useState();

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/users/self`, { mode: "cors", credentials: "include" })
            .then((response) => response.json())
            .then((response) => setUser(response))
            .catch((error) => console.error(error));
    }, []);

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
                <Outlet />
            </div>
        </>
    )
}

export default App
