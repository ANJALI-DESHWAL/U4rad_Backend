import React from 'react';

const RateList = ({ onAgree, onDisagree }) => {

  const tableData = [
    {modality:'MRI', type:'Head/Brain/Chest/Abdomen/Pelvis/PNS/Face', rate:'₹ 200'},
    {modality:'MRI', type:'MRI Screening (per body parts)', rate:'₹ 100'},
    {modality:'MRI', type:'MSK', rate:'₹ 250'},
    // ... add more rows following the screenshot
    {modality:'X-Ray', type:'Per Exposure - any body parts', rate:'₹ 20'}
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Rate List</h1>
      
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>#</th>
            <th>Modality</th>
            <th>Case Type</th>
            <th>Doctor Rate</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx} className="border">
              <td className="text-center">{idx+1}.</td>
              <td>{row.modality}</td>
              <td>{row.type}</td>
              <td>{row.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex gap-4 justify-center">
        <button onClick={onAgree} className="bg-yellow-400 px-6 py-2 font-semibold rounded">I Agree</button>
        <button onClick={onDisagree} className="bg-gray-500 px-6 py-2 text-white rounded">I Disagree</button>
      </div>
    </div>
  );
};

export default RateList;
