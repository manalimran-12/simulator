import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RandomDataTabMG2 from './Simulation/MG2/RandomDataTabMG2';
import CalculatedDataTabMG2 from './Simulation/MG2/CalculatedDataTabMG2';
import GraphicalViewTabMG2 from './Simulation/MG2/GraphicalViewTabMG2';

const SimulationMG2 = () => {
  const [activeTab, setActiveTab] = useState('random');
  const [randomData, setRandomData] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]);
  const [arrivalMean, setArrivalMean] = useState(0);
  const [serviceDistribution, setServiceDistribution] = useState('');
  const [serviceMean, setServiceMean] = useState(0);
  const location = useLocation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const arrivalMeanParam = parseFloat(params.get('arrivalMean'));
    const serviceMeanParam = parseFloat(params.get('serviceMean'));
    const selectedDistribution = params.get('serviceDistribution');

    if (!isNaN(arrivalMeanParam) && !isNaN(serviceMeanParam) && selectedDistribution) {
      setArrivalMean(arrivalMeanParam);
      setServiceMean(serviceMeanParam);
      setServiceDistribution(selectedDistribution);

      const data = generateRandomData(
        calculateCustomer(arrivalMeanParam),
        arrivalMeanParam,
        serviceMeanParam,
        selectedDistribution
      );
      setRandomData(data);

      const calculatedData = calculateCalculatedData(data, selectedDistribution, serviceMean);
      setCalculatedData(calculatedData);
    }
  }, [location.search]);

  function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }

  function poissonCumulativeProbability(lambda, x) {
    let cumulativeProbability = 0;
    for (let i = 0; i <= x; i++) {
      cumulativeProbability += (Math.exp(-lambda) * Math.pow(lambda, i)) / factorial(i);
    }
    return cumulativeProbability;
  }

  function calculateCustomer(lambda) {
    let x = 0;
    let cp = 0;
    while (cp < 0.9999) {
      cp = poissonCumulativeProbability(lambda, x);
      x++;
    }
    return x;
  }
  let A = 55;
  let Z = 10112166;
  let C = 9;
  const M = 1994;

  // Function to generate priority
  const generateprior = () => {
    const RHALF = A * Z + C;
    const R = RHALF % M;
    Z = R;
    const Random_Numbers = R / M;
    const priority = Math.round((3 - 1) * Random_Numbers + 1);
    return { priority };
  };


  const generateRandomData = (count, arrivalMean, serviceMean, serviceDistribution) => {
    const data = [];
    let arrivalTime = 0;

    for (let i = 1; i <= count; i++) {
      const interarrivalTime = Math.round(generateRandomTime(arrivalMean));
      const serviceTime = generateRandomServiceTime(serviceMean, serviceDistribution);

      arrivalTime += interarrivalTime;

      data.push({
        customer: i,
        interarrivalTime,
        arrivalTime: i === 1 ? 0 : arrivalTime,
        serviceTime,
        priority: Math.random() > 0.5 ? 1 : 2, // Assigning random priority (1 or 2)
      });
    }

    console.log('data', data);
    return data;
  };

  const generateRandomTime = (mean) => {
    const randomNumber = Math.random();
    const time = Math.round(-Math.log(1 - randomNumber) * mean);
    return time;
  };

  const generateRandomServiceTime = (mean, distribution) => {
    let serviceTime;

    if (distribution === 'gamma') {
      const shape = 2;
      const scale = mean / shape;

      serviceTime = Math.round(generateGammaDistribution(shape, scale));
    } else if (distribution === 'normal') {
      const standardDeviation = 1;

      serviceTime = Math.round(generateNormalDistribution(mean, standardDeviation));
    } else if (distribution === 'uniform') {
      const min = mean - 0.5;
      const max = mean + 0.5;

      serviceTime = Math.round(generateUniformDistribution(min, max));
    }

    return serviceTime;
  };

  const generateGammaDistribution = (shape, scale) => {
    let value = 0;

    for (let i = 0; i < shape; i++) {
      value -= Math.log(Math.random());
    }

    value *= scale;

    return value;
  };

  const generateNormalDistribution = (mean, standardDeviation) => {
    let value;
    let u, v, s;

    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);

    const multiplier = Math.sqrt(-2 * Math.log(s) / s);
    value = mean + standardDeviation * u * multiplier;

    return value;
  };

  const generateUniformDistribution = (min, max) => {
    return min + Math.random() * (max - min);
  };

  const calculateCalculatedData = (data, serviceDistribution, serviceMean) => {
    const calculatedData = [];

    let server1Data = [];
    let server2Data = [];

    let endTime1 = 0;
    let endTime2 = 0;

    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let totalResponseTime = 0;
    let totalServer1IdleTime = 0;
    let totalServer2IdleTime = 0;
    let totalServer1UtilizationTime = 0;
    let totalServer2UtilizationTime = 0;
    let expectedServiceTime;

    for (let i = 0; i < data.length; i++) {
      const { customer, interarrivalTime, arrivalTime, serviceTime, priority } = data[i];

      let startTime = 0;
      let endTime = 0;
      let server1 = true;
      let waitTime = 0;
      let turnaroundTime = 0;
      let responseTime = 0;

      if (serviceDistribution === 'gamma') {
        const gammaShape = 2;
        const gammaScale = serviceMean / gammaShape;

        expectedServiceTime = gammaShape * gammaScale;
      } else if (serviceDistribution === 'normal') {
        const normalStandardDeviation = 1;

        expectedServiceTime = serviceMean;
      } else if (serviceDistribution === 'uniform') {
        const uniformMin = serviceMean - 0.5;
        const uniformMax = serviceMean + 0.5;

        expectedServiceTime = (uniformMax - uniformMin) / 2;
      }

      if (customer === 1) {
        // For the first customer
        startTime = arrivalTime;
        endTime = startTime + serviceTime;
        endTime1 = endTime; // Update endTime1 for the first customer
        server1 = true;
        waitTime = 0;
        turnaroundTime = serviceTime;
        responseTime = serviceTime;
      } else {
        if (arrivalTime >= endTime1 && arrivalTime >= endTime2) {
          // Both servers are idle, choose the one with the smaller endTime
          if (endTime1 <= endTime2) {
            startTime = arrivalTime;
            endTime = startTime + serviceTime;
            endTime1 = endTime;
            server1 = true;
          } else {
            startTime = arrivalTime;
            endTime = startTime + serviceTime;
            endTime2 = endTime;
            server1 = false;
          }
        } else if (arrivalTime >= endTime1) {
          // Server 1 is idle or has just become idle
          startTime = arrivalTime;
          endTime = startTime + serviceTime;
          endTime1 = endTime;
          server1 = true;
        } else if (arrivalTime >= endTime2) {
          // Server 2 is idle or has just become idle
          startTime = arrivalTime;
          endTime = startTime + serviceTime;
          endTime2 = endTime;
          server1 = false;
        } else {
          // Both servers are busy, choose the one with the smaller endTime
          if (endTime1 <= endTime2) {
            startTime = endTime1;
            endTime = startTime + serviceTime;
            endTime1 = endTime;
            server1 = true;
          } else {
            startTime = endTime2;
            endTime = startTime + serviceTime;
            endTime2 = endTime;
            server1 = false;
          }
        }

        waitTime = startTime - arrivalTime;
        turnaroundTime = endTime - arrivalTime;
        responseTime = endTime - arrivalTime;
      }

      // Check if preemption is needed
      const preemptionNeeded = shouldPreempt(priority, server1Data, server2Data);

      if (preemptionNeeded) {
        if (shouldPreempt(priority, server1Data)) {
          // Preempt the low-priority job from server 1
          const preemptedJob = server1Data.pop();
          waitTime = startTime - preemptedJob.arrivalTime;
          turnaroundTime = endTime - preemptedJob.arrivalTime;
          responseTime = endTime - preemptedJob.arrivalTime;
          totalWaitTime -= preemptedJob.waitTime;
          totalTurnaroundTime -= preemptedJob.turnaroundTime;
          totalResponseTime -= preemptedJob.responseTime;
          totalServer1UtilizationTime -= preemptedJob.serviceTime;
          totalServer1IdleTime += startTime - preemptedJob.endTime;
          preemptedJob.preempted = true;
        } else if (shouldPreempt(priority, server2Data)) {
          // Preempt the low-priority job from server 2
          const preemptedJob = server2Data.pop();
          waitTime = startTime - preemptedJob.arrivalTime;
          turnaroundTime = endTime - preemptedJob.arrivalTime;
          responseTime = endTime - preemptedJob.arrivalTime;
          totalWaitTime -= preemptedJob.waitTime;
          totalTurnaroundTime -= preemptedJob.turnaroundTime;
          totalResponseTime -= preemptedJob.responseTime;
          totalServer2UtilizationTime -= preemptedJob.serviceTime;
          totalServer2IdleTime += startTime - preemptedJob.endTime;
          preemptedJob.preempted = true;
        }
      }

      if (server1) {
        server1Data.push({
          customer,
          interarrivalTime,
          arrivalTime,
          serviceTime,
          starttime: startTime,
          endtime: endTime,
          waitTime,
          turnaroundTime,
          responseTime,
          preempted: false,
          priority,
        });
        totalServer1UtilizationTime += serviceTime;
      } else {
        server2Data.push({
          customer,
          interarrivalTime,
          arrivalTime,
          serviceTime,
          starttime: startTime,
          endtime: endTime,
          waitTime,
          turnaroundTime,
          responseTime,
          preempted: false,
          priority,
        });
        totalServer2UtilizationTime += serviceTime;
      }

      totalWaitTime += waitTime;
      totalTurnaroundTime += turnaroundTime;
      totalResponseTime += responseTime;
    }

    const avgWaitTime = totalWaitTime / data.length;
    const totalServer1Time = endTime1;
    const totalServer2Time = endTime2;
    const totalSystemTime = totalServer1Time + totalServer2Time;
    const systemUtilization = (totalServer1UtilizationTime + totalServer2UtilizationTime) / totalSystemTime;
    console.log((totalServer1UtilizationTime + totalServer2UtilizationTime) + " / " + totalSystemTime + " = " + systemUtilization);
    const totalSystemIdleTime = 1 - systemUtilization;
    console.log(totalSystemIdleTime);
    const avgTurnaroundTime = totalTurnaroundTime / data.length;
    const avgResponseTime = totalResponseTime / data.length;
    const server1Utilization = totalServer1UtilizationTime / endTime1;
    const server2Utilization = totalServer2UtilizationTime / endTime2;
    const avgSystemTime = avgResponseTime + expectedServiceTime;

    console.log('server1Data', server1Data);
    console.log('server2Data', server2Data);


    const result = {
      avgWaitTime,
      avgTurnaroundTime,
      avgResponseTime,
      server1Utilization,
      server2Utilization,
      avgSystemTime,
      data,
      server1Data,
      server2Data,
    };

    return result;
  };


  const shouldPreempt = (priority, server1Data, server2Data) => {
    const lowPriorityJobs1 = Array.isArray(server1Data)
      ? server1Data.filter((job) => !job.preempted && job.priority < priority)
      : [];
    const lowPriorityJobs2 = Array.isArray(server2Data)
      ? server2Data.filter((job) => !job.preempted && job.priority < priority)
      : [];

    return lowPriorityJobs1.length > 0 || lowPriorityJobs2.length > 0;
  };


  return (
    <div className="flex flex-col items-center w-full" style={{ backgroundColor: 'black', opacity: '0.9' }}>
      <div className="w-full max-w-3xl flex justify-center space-x-4 my-8">
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${activeTab === 'random' ? 'active' : ''
            }`}
          onClick={() => handleTabChange('random')}
        >
          Random Data
        </button>
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${activeTab === 'calculated' ? 'active' : ''
            }`}
          onClick={() => handleTabChange('calculated')}
        >
          Calculated Data
        </button>
        <button
          className={`tab-button  bg-gray-50 border styled text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${activeTab === 'graphical' ? 'active' : ''
            }`}
          onClick={() => handleTabChange('graphical')}
        >
          Graphical View
        </button>
      </div>

      <div className="w-full ">
        {activeTab === 'random' && (
          <>
            <p className="text-center text-lg text-gray-300 underline">
              Using Distribution: {serviceDistribution}
            </p>
            <RandomDataTabMG2 randomData={randomData} />
          </>
        )}
        {activeTab === 'calculated' && (
          <>
            <p className="text-center text-lg text-gray-300 underline">
              Using Distribution: {serviceDistribution}
            </p>
            <CalculatedDataTabMG2 calculatedData={calculatedData} />
          </>
        )}
        {activeTab === 'graphical' && (
          <>
            <p className="text-center text-lg text-gray-300 underline">
              Using Distribution: {serviceDistribution}
            </p>
            <GraphicalViewTabMG2 calculatedData={calculatedData} />
          </>
        )}
      </div>
    </div>
  );
};

export default SimulationMG2;
