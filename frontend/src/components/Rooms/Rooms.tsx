import { Room } from '@/types';
import React from 'react';

const Rooms: React.FC = () => {

   const rooms: Room[] = [
          {
            "id": "28eb8977-f1ef-433b-b34d-acd3df15c2c3",
            "buildingId": "d2e48e12-3e69-4098-8b92-67ea8113931f",
            "name": "0.006",
            "externalId": null,
            "roomConfigurationId": "f17a739d-059f-45eb-b672-2bb644e625fc",
            "deviceId": "00-1C-08-00-2A-96",
            "deviceType": "ProHardwareCapture",
            "deviceSoftwareVersion": null,
            "createdAt": "2017-03-31T07:53:26.299+00:00",
            "updatedAt": "2017-03-31T07:53:26.299+00:00"
          }
        ];

  return (
   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-1 items-center pb-20">
      <div className="grid grid-cols-1 gap-4">
         <div className="">
            <p className="text-3xl">Rooms</p>
         </div>
         <div className="mx-auto max-w-7xl grid grid-cols-5 gap-4 bg-zinc-900 rounded-md p-3 m-3">
            {rooms.map((room) => (<>
            <span><h3 className='text-lg font-bold'>{room.name}</h3> <p className='text-xs'>{room.buildingId}</p></span>
            </>))}
         </div>

      </div>
   </div>

  )
}

export default Rooms