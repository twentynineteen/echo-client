import React from 'react';
import data from "../../assets/schedules.json";

function MyRecordings() {

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-1 items-center pb-20">
      <table className="border">
         <thead className="text-lg font-bold border">
            <tr >
               <th className="border-2">ID</th>
               <th className="border-2">Recording Title</th>
               <th className="border-2">Date</th>
               <th className="border-2">Start Time</th>
               <th className="border-2">End Time</th>
               <th className="border-2">Course Identifier</th>
               <th className="border-2">Term Name</th>
               <th className="border-2">Section Name</th>
               <th className="border-2">Availability</th>
               <th className="border-2">Room</th>
               <th className="border-2">Presenter</th>
            </tr>
         </thead>
         <tbody className="text-xs">
            {data.data.map((recording, index) => (

               <tr key={index}>
                  <td className="border truncate max-w-16">{recording.id}</td>
                  <td className="border">{recording.name}</td>
                  <td className="border">{recording.startDate}</td>
                  <td className="border">{recording.startTime}</td>
                  <td className="border">{recording.endTime}</td>
                  {recording.sections.length > 0 ? recording.sections.map((sub) => (
                     <>
                     <td className="border">{sub.courseIdentifier}</td>
                     <td className="border">{sub.termName}</td>
                     <td className="border">{sub.sectionName}</td>
                     <td className="border">{sub.availability.availability}</td>
                     </>
                     )) : <>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                  <td className="border"></td>
                  </>}
                  
                  <td className="border">{recording.venue.roomName}</td>
                  <td className="border">{recording.presenter ? recording.presenter.userEmail : "Null"}</td>
               </tr>

            ))}
         </tbody>
      </table>
    </div>
  )
}

export default MyRecordings