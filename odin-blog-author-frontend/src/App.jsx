import './App.css'
import { Form, Outlet, NavLink, useLoaderData } from "react-router-dom";

function App() {
    const { user } = useLoaderData();

    return (
        <>
            <nav className='navbar'>
                <NavLink to="">Home</NavLink>
                {user ? (
                    <Form method='post' action='logout'>
                        <button className='logout-btn'>Sign out</button>
                    </Form>
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
