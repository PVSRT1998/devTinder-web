import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Body'
import Login from './Login'
import Profile from './Profile'

function App() {

  return (
    <>

      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
