import { Headers, ListRequest, Schedule } from '../../types';
import { getSchedules } from "../Schedule/ScheduleFunctions";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

// import dummyData from '../../assets/schedules.json';

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

export default async function RecordingsTablePage() {
   const data: ListRequest<Schedule> = await getScheduleData();
   const recordings: Schedule[] = Object.values(data);
  console.log("typeof");
  console.log(typeof recordings);
  console.log("data.data = ");
  console.log(data['data']);
//   console.log("data.data.toString = ");
//   console.log(data.data.toString());
//   const recordings = data.data.map((recording)=> (
//    recording
// ));

//   console.log(typeof mapped);

   return (
      <div className="container">
         <DataTable columns={columns} data={recordings} />
      </div>
   )
}0