import './App.css'
import { Outlet, NavLink } from "react-router-dom";

function App() {

  return (
    <>
      <nav className='navbar'>
        <NavLink>Home</NavLink>
        <NavLink>Sign in</NavLink>
        <NavLink>Sign out</NavLink>
      </nav>
      <div className='content'>
        <Outlet />
      </div>
    </>
  )
}

export default App
