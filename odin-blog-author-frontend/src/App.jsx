import './App.css'
import { Outlet, NavLink } from "react-router-dom";

function App() {

    return (
        <>
            <nav className='navbar'>
                <NavLink to="">Home</NavLink>
                <NavLink to="login">Sign in</NavLink>
                <a href="http://localhost:3000/api/v1/logout">Sign out</a>
            </nav>
            <div className='content'>
                <Outlet />
            </div>
        </>
    )
}

export default App
