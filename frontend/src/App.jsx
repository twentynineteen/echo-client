import { ThemeProvider } from "@/components/theme-provider"
import './App.css'

import Navbar from "./components/Navbar"

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar/>
      <br></br>
      <p>Hello!</p>
    </ThemeProvider>
  )
}

export default App
