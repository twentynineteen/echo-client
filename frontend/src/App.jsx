import { ThemeProvider } from "@/components/theme-provider";
import {
  Link,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";

function Home() {
  return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex flex-1 items-center justify-left">
        <p className="text-3xl">Hello!</p>
      </div>
  );
}


function App() {

  return     (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes> 
      </ThemeProvider>
    </div>
  )
}

export default App


function Layout() {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}