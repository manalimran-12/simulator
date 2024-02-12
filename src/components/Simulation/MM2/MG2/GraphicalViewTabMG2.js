import React, { useEffect, useRef } from 'react';
import './GraphicalViewTabMG2.css';

import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, LineChart, Line } from 'recharts';

const GraphicalViewTabMG2 = ({ calculatedData }) => {
  const server1GanttChartRef = useRef(null);
  const server2GanttChartRef = useRef(null);

  const customerWaitTimeDataServer1 = calculatedData.server1Data.map((data) => ({
    customer: data.customer,
    waitTime: data.waitTime,
  }));
  console.log("wait1" + customerWaitTimeDataServer1 )



  const customerWaitTimeDataServer2 = calculatedData.server2Data.map((data) => ({
    customer: data.customer,
    waitTime: data.waitTime,
  }));
  console.log("wait2" + customerWaitTimeDataServer2 )

  const customerArrivalTimeDataServer1 = calculatedData.server1Data.map((data) => ({
    customer: data.customer,
    arrivalTime: data.arrivalTime,
  }));
  console.log(customerArrivalTimeDataServer1)

  const customerArrivalTimeDataServer2 = calculatedData.server2Data.map((data) => ({
    customer: data.customer,
    arrivalTime: data.arrivalTime,
  }));


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
    <div className=''>
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
      <h4 className="text-2xl  text-center text-gray-300 font-bold my-4">Bar Chart</h4>
      <div className='flex flex-row space-x-10 justify-center'>
        <div className="graph-container">
          {/* Bar Chart - Customer vs. Wait Time (Server 1) */}
          <h4 className='text-gray-300'>Customer vs. Wait Time (Server 1)</h4>
          <BarChart width={500} height={300} data={customerWaitTimeDataServer1}>
            <XAxis dataKey="customer" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="waitTime" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="graph-container">
          {/* Bar Chart - Customer vs. Wait Time (Server 2) */}
          <h4 className='text-gray-300'>Customer vs. Wait Time (Server 2)</h4>
          <BarChart width={500} height={300} data={customerWaitTimeDataServer2}>
            <XAxis dataKey="customer" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="waitTime" fill="#8884d8" />
          </BarChart>
        </div>
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

export default GraphicalViewTabMG2;
