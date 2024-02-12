import React from 'react';

const RandomDataTab = ({ randomData }) => {
  const simulatedData = randomData;

  return (
    <div className="text-red-500">
      <h1 className="text-center text-3xl text-gray-300 font-bold mb-10">Random Data</h1>
      <table className="w-full text-black">
        <thead>
          <tr>
            <th className='text-xl'>Customer</th>
            <th className='text-xl'>Interarrival Time</th>
            <th className='text-xl'>Arrival Time</th>
            <th  className='text-xl'>Service Time</th>
          </tr>
        </thead>
        <tbody>
          {simulatedData.map((data) => (
            <tr key={data.customer}>
              <td className='text-center pt-9 font-bold'>{data.customer}</td>
              <td className='text-center pt-9 font-bold'>{data.interarrivalTime}</td>
              <td className='text-center pt-9 font-bold'>{data.arrivalTime}</td>
              <td className='text-center pt-9 font-bold'>{data.serviceTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RandomDataTab;
