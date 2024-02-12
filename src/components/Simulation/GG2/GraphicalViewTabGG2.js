import React, { useEffect, useRef } from 'react';
import './GraphicalViewTabGG2.css';

import { PieChart,Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, LineChart, Line } from 'recharts';

const GraphicalViewTabMM2 = ({ calculatedData }) => {
  const server1GanttChartRef = useRef(null);
  const server2GanttChartRef = useRef(null);
  console.log(calculatedData)
  const customerWaitTimeDataServer1 = calculatedData.server1Data.map((data) => ({
    customer: data.customer,
    waitTime: data.waitTime,
  }));



  const customerWaitTimeDataServer2 = calculatedData.server2Data.map((data) => ({
    customer: data.customer,
    waitTime: data.waitTime,
  }));

  const customerArrivalTimeDataServer1 = calculatedData.server1Data.map((data) => ({
    customer: data.customer,
    arrivalTime: data.arrivalTime,
  }));
  console.log(customerArrivalTimeDataServer1)

  const customerArrivalTimeDataServer2 = calculatedData.server2Data.map((data) => ({
    customer: data.customer,
    arrivalTime: data.arrivalTime,
  }));

  const serverUtilizationData1 =
    
    {utilization: calculatedData.server1UtilizationPercentage,
    idleTime: calculatedData.server1IdlePercentage};
    const serverUtilizationData2 =
    
    {utilization: calculatedData.server2UtilizationPercentage,
    idleTime: calculatedData.server2IdlePercentage};


  useEffect(() => {
    const animateGanttChart = (ganttChartRef, serverData) => {
      const ganttChart = ganttChartRef.current;
      const bars = ganttChart.querySelectorAll('.gantt-chart-bar');

      bars.forEach((bar, index) => {
        const { startTime, endTime, idle } = serverData[index];
        const barWidth = calculateBarWidth(startTime, endTime);

        bar.style.width = barWidth + '%';
        bar.style.animationDuration = `${barWidth * 2}s`;

        if (idle) {
          bar.classList.add('idle');
        }
      });
    };

    animateGanttChart(server1GanttChartRef, calculatedData.server1Data);
    animateGanttChart(server2GanttChartRef, calculatedData.server2Data);
  }, [calculatedData.server1Data, calculatedData.server2Data]);

  const calculateBarWidth = (startTime, endTime) => {
    const timeDifference = endTime - startTime;
    const currentTime = Date.now() - startTime;
    const barWidth = (currentTime / timeDifference) * 100;

    return Math.min(barWidth, 100);
  };

  return (
    <div className='  '>
      <h3 className="text-3xl  text-center text-gray-300 font-bold mb-10">Graphical View</h3>

      <div className="gantt-chart-container w-full">
        <div className="server1-gantt-chart">
          <h3 className='text-2xl text-gray-300 font-bold'>Server 1</h3>
          <div className="gantt-chart w-full" ref={server1GanttChartRef}>
            {calculatedData.server1Data.map((data, index) => (
              <div className="gantt-chart-bar" key={data.customer}>
                <div className="gantt-chart-label">
                  <div className="start-time2">{data.starttime}</div>
                  <div className="end-time2">{data.endtime}</div>
                </div>
                <div className="customer-name">Customer {data.customer}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="server2-gantt-chart">
          <h3 className='text-2xl text-gray-300 font-bold'>Server 2</h3>
          <div className="gantt-chart" ref={server2GanttChartRef}>
            {calculatedData.server2Data.map((data, index) => (
              <div className="gantt-chart-bar" key={data.customer}>
                <div className="gantt-chart-label">
                  <div className="start-time2">{data.starttime}</div>
                  <div className="end-time2">{data.endtime}</div>
                </div>
                <div className="customer-name">Customer {data.customer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h4 className="text-2xl text-center text-gray-300 font-bold my-4">Pie Chart</h4>
      <div className='flex flex-row space-x-10 justify-center'>
      <div className="graph-container">
  {/* Pie Chart - Server 1 Utilization */}
  <h4 className="text-gray-300">Server 1 Utilization</h4>
  <PieChart width={500} height={300}>
    <Pie
      data={[
        { name: 'Utilization', value: serverUtilizationData1.utilization, fill: '#82ca9d' },
        { name: 'Idle Time', value: serverUtilizationData1.idleTime, fill: '#FF0000' },
      ]}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
    >
      <Cell key="utilization" />
      <Cell key="idleTime" />
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</div>

<div className="graph-container">
  {/* Pie Chart - Server 2 Utilization */}
  <h4 className="text-gray-300">Server 2 Utilization</h4>
  <PieChart width={500} height={300}>
    <Pie
      data={[
        { name: 'Utilization', value: serverUtilizationData2.utilization, fill: '#82ca9d' },
        { name: 'Idle Time', value: serverUtilizationData2.idleTime, fill: '#FF0000' },
      ]}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
    >
      <Cell key="utilization" />
      <Cell key="idleTime" />
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>  </div>
</div>

      <h4 className="text-2xl  text-center text-gray-300 font-bold my-4">Line Chart</h4>
      <div className='flex flex-row space-x-10 justify-center'>
        <div className="graph-container">
          {/* Line Chart - Customer vs. Arrival Time (Server 1) */}
          <h4 className='text-gray-300'>Customer vs. Arrival Time (Server 1)</h4>
          <LineChart width={500} height={300} data={customerArrivalTimeDataServer1}>
            <XAxis dataKey="customer" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="arrivalTime" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="graph-container">
          {/* Line Chart - Customer vs. Arrival Time (Server 2) */}
          <h4 className='text-gray-300'>Customer vs. Arrival Time (Server 2)</h4>
          <LineChart width={500} height={300} data={customerArrivalTimeDataServer2}>
            <XAxis dataKey="customer" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="arrivalTime" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default GraphicalViewTabMM2;
