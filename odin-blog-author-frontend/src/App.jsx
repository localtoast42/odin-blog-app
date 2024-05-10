import './App.css'
import { Outlet, NavLink } from "react-router-dom";

function App() {

  return (
    <>
      <nav className='navbar'>
        <NavLink to="">Home</NavLink>
        <NavLink to="login">Sign in</NavLink>
        <NavLink to="logout">Sign out</NavLink>
      </nav>
      <div className='content'>
        <Outlet />
      </div>
    </>
  )
}

export default App
