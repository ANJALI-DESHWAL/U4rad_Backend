import React from 'react';

const ViewResponse = ({ data }) => {

  // "data" will be the final form object from RadiologistRegistration submission

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Submitted Information</h1>

      {/* PERSONAL */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2 border-b pb-1">Personal Information</h2>
        <p>First Name: {data.firstName}</p>
        <p>Last Name: {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Contact: {data.contact}</p>
        <p>Years of Experience: {data.experienceYears}</p>
        {/* ... etc */}
      </section>

      {/* EDUCATION */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2 border-b pb-1">Educational Details</h2>
        <p>10th School: {data.class10School}</p>
        <p>12th School: {data.class12School}</p>
        <p>MBBS Inst: {data.mbbsInst}</p>
        {/* ... list all others */}
      </section>

      {/* similarly sections for Experience, Achievements, Banking, Area, Time etc */}
    </div>
  );
};

export default ViewResponse;
