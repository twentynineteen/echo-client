import { Headers, ListRequest, Schedule } from '../../types';
import { getSchedules } from "../Schedule/ScheduleFunctions";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

import React from 'react';

async function getScheduleData(): Promise<ListRequest<Schedule>> {
   
   // axios set up
   const baseUrl: string = 'http://localhost:8080';

   // basic auth header to backend requests in axios
   const headers: Headers = {
      headers: { 
         'X-API-KEY': 'DwightSchrute',            
      }
   };

   const schedules: ListRequest<Schedule> = await getSchedules(baseUrl, headers);
   return schedules;
}

export default function RecordingsTablePage() {
   const [recordings, setRecordings] = React.useState<Schedule[]>([]); //state for recordings list data. return null if unresolved
   const [loading, setLoading] = React.useState<boolean>(true); //state for loading data. Default to true.

   React.useEffect(()=> {
      //fetch data
      const fetchData = async () => {
         const result: ListRequest<Schedule> = await getScheduleData();
         // Parse listRequest response (result) into an array of objects containing scheduled recordings
         const mappedData = result.data.map((recording)=>(recording));
         // render list of recordings into recordings state so that it can be displayed on browser table
         setRecordings(mappedData);
         // set loading state to false so that table can be displayed on screen
         setLoading(false);
      };
      // call fetchData on page mount
      fetchData();
   }, [])


   if (loading) return <div>Loading...</div>; //loading state

   return (
      <div className="container">
         <DataTable columns={columns} data={recordings} />
      </div>
   )
}