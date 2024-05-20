import './App.css'
import { UserContext } from "./UserContext";
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
                <UserContext.Provider value={ user }>
                    <Outlet />
                </UserContext.Provider>
            </div>
        </>
    )
}

export default App
