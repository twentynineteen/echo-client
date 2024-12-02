import React from 'react';
import data from "../../assets/users.json";

function Presenters() {
   
  return (
   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-1 items-center pb-20">

      <div className="grid grid-cols-1 gap-4">
         <div className="">
               <p className="text-3xl">Presenters</p>
         </div>
         <div className="grid grid-cols-3 gap-4 bg-zinc-900 rounded-md p-3 ">
            {data.data.map((presenter) => (
               <span>
                  <h3 className='text-lg font-bold'>{presenter.firstName ? presenter.firstName : 'No Name'} {presenter.lastName}</h3>
                  <p className='text-xs truncate max-w-64'>{presenter.email}</p>
               </span>
               ))}
         </div>
      </div>
   </div>
  )
}

export default Presenters