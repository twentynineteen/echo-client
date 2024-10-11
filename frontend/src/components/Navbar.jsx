
import { ModeToggle } from "./mode-toggle"

function Navbar() {
  return (
    <header>


      <ul className="flex max-w-md sm:justify-between">
               
               <li><a href="#"><img src="src/assets/wbsLecturesIconBlack.svg" width="40" height="40"/></a></li>
               <li><a href="#">Schedule a Recording</a></li>
               <li><a href="#">My Recordings</a></li>
               <li><a href="#">Rooms</a></li>
               <li><a href="#">Presenters</a></li>
               <li><a href="#">Support Tickets</a></li>
               <li><a href="#">Contact</a></li>
               <ModeToggle/>

      </ul>
    </header>
  )
}

export default Navbar