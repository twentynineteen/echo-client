import React from 'react';
import data from "../../assets/courses.json";

const Modules: React.FC = () => {
   
  return (
   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-1 items-center pb-20">

      <div className="grid grid-cols-1 gap-4">
         <div className="">
               <p className="text-3xl">Modules</p>
         </div>
         <div className="grid grid-cols-8 gap-4 bg-zinc-900 rounded-md p-3 m-3">
            {data.data.map((module) => (
               <span>
                  <h3 className='text-lg font-bold'>{module.name}</h3>
                  <p className='text-xs'>{module.courseIdentifier}</p>
               </span>
               ))}
         </div>
      </div>
   </div>
  )
}

export default Modules