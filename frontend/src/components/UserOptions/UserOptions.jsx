import React from 'react'

function UserOptions() {
  return (
   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-1 items-center pb-20">
      <div className="grid py-3">
         <p className="text-3xl">Options</p>
         <div className="categories pt-3">
            <p className="text-1xl font-bold">Occasion options</p>
            <div className="p-3 grid grid-cols-3 gap-4 align-middle">
               <p>List occasions here: </p>
               <p>Add new occasion here: </p>
               <p>Remove occasion here: </p>
            </div>
         </div>
         <div className="groups">
            <p className="text1xl font-bold">Group options</p>
            <div className="p-3 grid grid-cols-3 gap-4 align-middle">
               <p>List groups here: </p>
               <p>Add new group here: </p>
               <p>Remove group here: </p>
            </div>
         </div>
      </div>
   </div>
  )
}

export default UserOptions