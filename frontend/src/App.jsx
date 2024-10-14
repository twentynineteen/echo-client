import { ThemeProvider } from "@/components/theme-provider"
import './App.css'

import Navbar from "./components/Navbar"

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar/>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex flex-1 items-center justify-left">
        <p className="text-3xl">Hello!</p>
      </div>
    </ThemeProvider>
  )
}

export default App
