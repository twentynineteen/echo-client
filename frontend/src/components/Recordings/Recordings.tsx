import React from 'react';
import RecordingsTablePage from '../RecordingsTable/page';

const Recordings: React.FC = () => {

  return (
    <div className="" >
      <div className="page-header px-2 flex flex-1">
        <p className="text-3xl mx-auto w-5/6">Recordings</p>
      </div>
      <div className="mx-auto lg:w-fit sm:w-5/6 px-2 sm:px-6 lg:px-8 flex flex-1 justify-center pb-12">
        <RecordingsTablePage />
      </div>
    </div>
  )
}

export default Recordings