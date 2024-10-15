import React from 'react'

export default function Footer() {
  return (
    <div className="bg-white mx-auto h-48 place-items-end">
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
            <p className="text-black mt-2 text-xs">Lecture Capture Handbook</p>
            </div>
      </div>
    </div>
  )
}
