import React, { useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import { login, logout } from './features/authSlice/authSlice';
import { Header, Footer } from '../src/components/index.js'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {

  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) { dispatch(login({ userData })) }
        else { dispatch(logout()) }
      })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false))

      if (location.pathname === "https://parthpanchal26.github.io/") {
        console.log(location.pathname)
        navigate('/kravix/');
      }      

      if (location.pathname === "http://localhost:5173/") {
        console.log(location.pathname)
        navigate('/kravix/');
      }      

  }, [navigate, location])


  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-800">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
