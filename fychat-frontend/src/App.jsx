import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { UsernameProvider } from './context/UsernameContext';
import './App.css'

function App() {

  return (
    <BrowserRouter>
        <UsernameProvider>
            <AppRoutes />
        </UsernameProvider>
    </BrowserRouter> 
  )
}

export default App
