import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="bg-white mx-auto h-48 max-w-7xl">
      <div className="grid grid-cols-5">
         <div className="col-start-1">
            <div className="mt-6 mx-3">
              <img
                alt="Lectures"
                src="/src/assets/wbsLecturesIconBlack.svg"
                className="h-8 w-auto"
              />
            </div>
            </div>
         <div className="col-start-2">
            <p className="text-black mt-6 text-m font-bold">Lectures</p>
            <p className="text-black mt-4 text-xs">Help</p>
            <p className="text-black mt-2 text-xs">Lecture Capture Policy</p>
            <p className="text-black mt-2 text-xs"><a href="https://my.wbs.ac.uk/-/community/224/resources/in/1537971/">Lecture Capture Handbook</a></p>
          </div>
      </div>
    </div>
  )
}

export default Footer
