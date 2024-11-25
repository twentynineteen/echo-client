import { ThemeProvider } from "@/components/theme-provider";
import {
  Link,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';

import Footer from "./components/Footer/Footer";
import Modules from "./components/Modules/Modules";
import MyRecordings from "./components/MyRecordings/MyRecordings";
import Navbar from "./components/Navbar";
import Presenters from "./components/Presenters/Presenters";
import Rooms from "./components/Rooms/Rooms";
import Schedule from "./components/Schedule/Schedule";
import UserOptions from "./components/UserOptions/UserOptions";

function Home() {
  return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex flex-1 items-center justify-left">
        <p className="text-3xl">Hello!</p>
      </div>
  );
}

function App() {

  return     (
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
            <Route path="/myrecordings" element={<MyRecordings />} />
            <Route path="/options" element={<UserOptions />} />
          </Route>       
        </Routes> 


        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  )
}

export default App


function Layout() {
  return (
    <div>
      <div className="content-container">
        <Navbar/>
        <Outlet />
      </div>
      <div className="footer--pin">
        <Footer />
      </div>
    </div>
  )
}

function NoMatch() {
  return (
    <div className="max-w-7xl mx-auto pt-3 h-[240px]">
      <h2>Nothing to see here yet!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}