import React, { useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import { login, logout } from './features/authSlice/authSlice';
import { Header, Footer } from '../src/components/index.js'
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false))
  }, [])


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
