import { DataTable } from "../ui/data-table";
import { Recordings, columns } from "./columns";

import dummyData from '../../assets/schedules.json';

function getData(): Recordings[] {
   //function to get recordings data

   const recordings = dummyData.data.map((recording)=> (
      recording
   ));
   return recordings;
}

export default function RecordingsTablePage() {
  const data = getData();

   return (
      <div className="container">
         <DataTable columns={columns} data={data} />
      </div>
   )
}