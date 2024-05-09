import './App.css'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <nav className='navbar'>

      </nav>
      <div className='content'>
        <Outlet />
      </div>
    </>
  )
}

export default App
