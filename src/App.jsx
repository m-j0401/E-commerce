import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Products_Detail from './pages/Products_Detail'
import Products_List from './pages/Products_List'
import Navbar from './Pages/Navbar'


const App=()=> {
  return (
    
    <div className="min-h-screen">
       <Navbar/>
      <main className="mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Products_List />} />
          <Route path="/product/:id" element={<Products_Detail />} />
        </Routes>
      </main>
    </div>
  
  )
}

export default App
