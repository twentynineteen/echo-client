import { ThemeProvider } from "@/components/theme-provider"
import React from 'react'
import { Link, Outlet, Route, Routes } from "react-router-dom"
import './App.css'

import { Toaster } from "@/@/components/ui/toaster"

import Footer from "./components/Footer/Footer"
import Modules from "./components/Modules/Modules"
import Navbar from "./components/Navbar"
import Presenters from "./components/Presenters/Presenters"
import Recordings from "./components/Recordings/Recordings"
import Rooms from "./components/Rooms/Rooms"
import Schedule from "./components/Schedule/Schedule"
import UserOptions from "./components/UserOptions/UserOptions"


// Home Component
const Home: React.FC = () => {
  return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex flex-1 items-center justify-left">
        <p className="text-3xl">Hello!</p>
      </div>
  )
}

// Layout Component
const Layout: React.FC = ()=> {
  return (
    <div>
      <div className="content-container">
        <Navbar />
        <Outlet />
        <Toaster />
      </div>
      <div className="footer--pin">
        <Footer />
      </div>
    </div>
  )
}

// NoMatch Component - broken 404 links
const NoMatch: React.FC = ()=> {
  return (
    <div className="max-w-7xl mx-auto pt-3 h-[240px]">
      <h2>Nothing to see here yet!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

// App Component
const App: React.FC = ()=> {
  return  (
    <div className="spa-container">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/presenters" element={<Presenters />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/options" element={<UserOptions />} />
          </Route>       
        </Routes> 
      </ThemeProvider>
    </div>
  )
}

export default App