import React from 'react';

const CalculatedDataTab = ({ calculatedData }) => {
  console.log(calculatedData)
  return (
    <div className="overflow-auto">
      <h2 className="text-center text-3xl text-gray-300 font-bold mb-5">Calculated Data</h2>
      <div className="text-center mb-4">
        <h3 className="text-2xl text-gray-300 font-bold">Server 1</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-xl">Customer</th>
            <th className="text-xl">priority</th>
            <th className="text-xl">Start Time</th>
            <th className="text-xl">End Time</th>
            <th className="text-xl">Wait Time</th>
            <th className="text-xl">Turnaround Time</th>
            
          </tr>
        </thead>
        <tbody>
          {calculatedData.calculatedData.map((data) => (
            <tr key={data.customer}>
              <td className="text-center py-2 font-bold">{data.customer}</td>
              <td className="text-center py-2 font-bold">{data.priorities}</td>
              <td className="text-center py-2 font-bold">{data.startTime}</td>
              <td className="text-center py-2 font-bold">{data.endTime}</td>
              <td className="text-center py-2 font-bold">{data.waitTime}</td>
              <td className="text-center py-2 font-bold">{data.turnaroundTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <h3 className="text-2xl text-gray-300 font-bold text-center">Server Idle Time and Utilization</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl">Server</th>
              <th className="text-xl">Idle Time</th>
              <th className="text-xl">Utilization Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 text-center font-bold">Server 1</td>
              <td className="py-2 text-center font-bold">{calculatedData.serverIdle.toFixed(2)*100}%</td>
              <td className="py-2 text-center font-bold">{calculatedData.serverUtilization.toFixed(2)*100}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalculatedDataTab;
