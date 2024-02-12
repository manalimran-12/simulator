import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RandomDataTabGG1 from './Simulation/GG1/RandomDataTabGG1';
import CalculatedDataTabGG1 from './Simulation/GG1/CalculatedDataTabGG1';
import GraphicalViewTabGG1 from './Simulation/GG1/GraphicalViewTabGG1';

const SimulationGG1 = () => {
  const [activeTab, setActiveTab] = useState('random');
  const [randomData, setRandomData] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]);
  const [arrivalMean, setArrivalMean] = useState(0);
  const [serviceDistribution, setServiceDistribution] = useState('');
  const [serviceMean, setServiceMean] = useState(0);
  const [arrivalDistribution, setArrivalDistribution] = useState('');
  const location = useLocation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const arrivalMeanParam = parseFloat(params.get('arrivalMean'));
    const serviceMeanParam = parseFloat(params.get('serviceMean'));
    const selectedDistribution = params.get('serviceDistribution');
    const selectedArrivalDistribution = params.get('arrivalDistribution');
    console.log(arrivalMeanParam + " " + serviceMeanParam + selectedArrivalDistribution)
    if (
      !isNaN(arrivalMeanParam) &&
      !isNaN(serviceMeanParam) &&
      selectedDistribution &&
      selectedArrivalDistribution
    ) {
      setArrivalMean(arrivalMeanParam);
      setServiceMean(serviceMeanParam);
      setServiceDistribution(selectedDistribution);
      setArrivalDistribution(selectedArrivalDistribution);

      const data = generateRandomData(
        calculatecustomer(arrivalMeanParam),
        arrivalMeanParam,
        serviceMeanParam,
        selectedArrivalDistribution,
        selectedDistribution
      );
      setRandomData(data);

      const calculatedData = calculateCalculatedData(serviceMean, data, selectedDistribution);
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
  function calculatecustomer(lambda)
  {
    let x=0
    let cp = 0;
    while (cp < 0.9999) {
      cp = poissonCumulativeProbability(lambda, x);
      x++;
    }
    return(x)
  }

  const generateRandomData = (
    count,
    arrivalMean,
    serviceMean,
    arrivalDistribution,
    serviceDistribution
  ) => {
    const data = [];
    let arrivalTime = 0;

    const arrivalRate = 1 / arrivalMean; // Calculate arrival rate (λ) from mean

    for (let i = 1; i <= count; i++) {
      const interarrivalTime = Math.round(
        generateRandomTime(arrivalRate, arrivalDistribution)
      );
      const serviceTime = generateRandomServiceTime(serviceMean, serviceDistribution);

      arrivalTime += interarrivalTime;

      data.push({
        customer: i,
        interarrivalTime,
        arrivalTime: i === 1 ? 0 : arrivalTime,
        serviceTime,
      });
    }

    return data;
  };

  const generateRandomTime = (mean, distribution) => {
    let time;

    if (distribution === 'gamma') {
      // Generate exponentially-distributed random time
      // Generate gamma-distributed random time
      const shape = 2; // Shape parameter for gamma distribution (example value)
      const scale = mean / shape; // Scale parameter for gamma distribution

      let value = 0;
      for (let i = 0; i < shape; i++) {
        value -= Math.log(Math.random());
      }
      time = Math.round(value * scale);
    } else if (distribution === 'uniform') {
      // Generate uniformly-distributed random time
      time = Math.round(Math.random() * mean);
    } else if (distribution === 'normal') {
      // Generate normally-distributed random time
      const standardDeviation = mean / 3; // Assuming 99.7% of values are within 3 standard deviations
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += Math.random();
      }
      time = Math.round((sum - 6) * standardDeviation + mean);
    }

    return time;
  };


  const generateRandomServiceTime = (mean, distribution) => {
    let serviceTime;

    if (distribution === 'gamma') {
      // Generate gamma-distributed service time
      const shape = 2; // Shape parameter for gamma distribution (example value)
      const scale = mean / shape; // Scale parameter for gamma distribution

      serviceTime = Math.round(generateGammaDistribution(shape, scale));

    } else if (distribution === 'normal') {
      // Generate normally-distributed service time
      const standardDeviation = 1; // Standard deviation for normal distribution (example value)

      serviceTime = Math.round(generateNormalDistribution(mean, standardDeviation));

    } else if (distribution === 'uniform') {
      // Generate uniformly-distributed service time
      const min = mean - 0.5; // Minimum value for uniform distribution
      const max = mean + 0.5; // Maximum value for uniform distribution

      serviceTime = Math.round(generateUniformDistribution(min, max));
    }

    return serviceTime;
  };

  // Helper function to generate a random number from gamma distribution
  const generateGammaDistribution = (shape, scale) => {
    // Implementation of the gamma distribution using the Marsaglia and Tsang method
    let value = 0;

    // Marsaglia and Tsang method to generate gamma-distributed random number
    for (let i = 0; i < shape; i++) {
      value -= Math.log(Math.random());
    }

    value *= scale;

    return value;
  };

  const generateNormalDistribution = (mean, standardDeviation) => {
    // Implementation of the Box-Muller transform for generating normally-distributed random number
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
    // Generate a random number within the specified range
    return min + Math.random() * (max - min);
  };
  let A=55;
  let M=1994;
  let a=1;
  let b=3;
  let Z=10112166;
  let C=9; 
  //for generating priority 
  const generateprior =()=>{
    
    const RHALF = (A * Z + C);
    const R = RHALF % M;
    Z = R;
    const Random_Numbers = R / M;
    const priority = Math.round((3 - 1) * Random_Numbers + 1);
    return priority;
  } ;


  const calculateCalculatedData = (serviceMean, data, serviceDistribution) => {
    const calculatedData = [];
    let totalWaitTime = 0;
    let totalTurnaroundTime = 0;
    let serverIdleTime = 0;
    let serverUtilizationTime = 0;
    let expectedServiceTime;
    const n = data.length;
    let startTime = new Array(n).fill(0);
    const endTime = new Array(n).fill(0);
    const priority = [];

    for (let i = 0; i < data.length; i++) {
      priority.push(generateprior());
    }

    // Create an array of indices and sort them based on priority in ascending order
    const jobOrder = Array.from({ length: n }, (_, i) => i).sort((a, b) => priority[a] - priority[b]);

    let currentTime = 0;

    for (const jobIndex of jobOrder) {
      const { arrivalTime, serviceTime } = data[jobIndex];
      const currentPriority = priority[jobIndex];

      // If the customer has a higher priority and has arrived, preempt the current job
      if (arrivalTime <= currentTime && currentPriority < priority[jobOrder[0]]) {
        // Update wait and turnaround time for the preempted job
        const waitTime = Math.max(0, currentTime - arrivalTime);
        const turnaroundTime = waitTime + serviceTime;

        calculatedData.push({
          customer: data[jobOrder[0]].customer,
          cumulativeProbability: 0,
          interarrivalTime: 0,
          arrivalTime: arrivalTime,
          serviceTime: data[jobOrder[0]].serviceTime,
          priorities: priority[jobOrder[0]],
          startTime: currentTime,
          endTime: currentTime + data[jobOrder[0]].serviceTime,
          waitTime,
          turnaroundTime,
          expectedServiceTime: data[jobOrder[0]].expectedServiceTime, // Use the expectedServiceTime of the preempted job
        });

        totalWaitTime += waitTime;
        totalTurnaroundTime += turnaroundTime;
        serverUtilizationTime += data[jobOrder[0]].serviceTime;

        // Update current time to the end time of the preempted job
        currentTime += data[jobOrder[0]].serviceTime;

        // Remove the preempted job from the job order
        jobOrder.shift();
      }

      // Set start time to 0 if the customer arrives at time 0
      startTime[jobIndex] = arrivalTime === 0 ? 0 : Math.max(currentTime, arrivalTime);
      endTime[jobIndex] = startTime[jobIndex] + serviceTime;

      // Update current time to the end time of the current job
      currentTime = endTime[jobIndex];

      expectedServiceTime = calculateExpectedServiceTime(serviceDistribution, serviceMean);
    }

    for (let i = 0; i < data.length; i++) {
      const { customer, interarrivalTime, arrivalTime, serviceTime } = data[i];
      const endTimeValue = Math.max(arrivalTime, startTime[i]) + serviceTime;
      const waitTime = Math.max(0, startTime[i] - arrivalTime);
      const turnaroundTime = waitTime + serviceTime;
    
      calculatedData.push({
        customer,
        interarrivalTime,
        arrivalTime,
        serviceTime,
        priorities: priority[i],
        startTime: Math.max(arrivalTime, startTime[i]),
        endTime: endTimeValue,
        waitTime,
        turnaroundTime,
        expectedServiceTime,
      });
    
      totalWaitTime += waitTime;
      totalTurnaroundTime += turnaroundTime;
    
      // Only subtract arrivalTime when i is greater than 0
      if (i > 0) {
        serverIdleTime += Math.max(0, startTime[i] - arrivalTime);
      }
    
      serverUtilizationTime += serviceTime;
    
      startTime[i] = endTimeValue; // Update startTime for the next iteration
    
      if (serviceDistribution === 'gamma') {
        // Calculate server utilization and idle time for gamma distribution
        const gammaShape = 2; // Example shape parameter for gamma distribution
        const gammaScale = serviceMean / gammaShape; // Example scale parameter for gamma distribution
    
        expectedServiceTime = gammaShape * gammaScale; // Example calculation of expected service time
    
      } else if (serviceDistribution === 'normal') {
        // Calculate server utilization and idle time for normal distribution
        const normalStandardDeviation = 1; // Example standard deviation for normal distribution
    
        expectedServiceTime = serviceMean; // Example calculation of expected service time
    
      } else if (serviceDistribution === 'uniform') {
        // Calculate server utilization and idle time for uniform distribution
        const uniformMin = serviceMean - 0.5; // Example minimum value for uniform distribution
        const uniformMax = serviceMean + 0.5; // Example maximum value for uniform distribution
    
        expectedServiceTime = (uniformMax - uniformMin) / 2; // Example calculation of expected service time
      }
    }    

    const averageWaitTime = totalWaitTime / data.length;
    const averageTurnaroundTime = totalTurnaroundTime / data.length;

    const totalTime = startTime[data.length - 1];
    let serverUtilization, serverIdle;

    if (serviceDistribution === 'gamma') {
      // Calculate server utilization and idle time for gamma distribution
      const gammaShape = 2; // Example shape parameter for gamma distribution
      const gammaScale = serviceMean / gammaShape; // Example scale parameter for gamma distribution

      expectedServiceTime = gammaShape * gammaScale; // Example calculation of expected service time

      serverUtilization = serverUtilizationTime / totalTime;
      serverIdle = 1 - serverUtilization;
    } else if (serviceDistribution === 'normal') {
      // Calculate server utilization and idle time for normal distribution
      const normalStandardDeviation = 1; // Example standard deviation for normal distribution

      expectedServiceTime = serviceMean; // Example calculation of expected service time

      serverUtilization = serverUtilizationTime / totalTime;
      serverIdle = 1 - serverUtilization;
    } else if (serviceDistribution === 'uniform') {
      // Calculate server utilization and idle time for uniform distribution
      const uniformMin = serviceMean - 0.5; // Example minimum value for uniform distribution
      const uniformMax = serviceMean + 0.5; // Example maximum value for uniform distribution

      expectedServiceTime = (uniformMax - uniformMin) / 2; // Example calculation of expected service time

      serverUtilization = serverUtilizationTime / totalTime;
      serverIdle = 1 - serverUtilization;
    }

    return {
      calculatedData,
      averageWaitTime,
      averageTurnaroundTime,
      serverUtilization,
      serverIdle,
      expectedServiceTime,
    };
  };

const calculateExpectedServiceTime = (serviceDistribution, serviceMean) => {
    if (serviceDistribution === 'gamma') {
        // Calculate expected service time for gamma distribution
        const gammaShape = 2; // Example shape parameter for gamma distribution
        const gammaScale = serviceMean / gammaShape; // Example scale parameter for gamma distribution

        return gammaShape * gammaScale; // Example calculation of expected service time
    } else if (serviceDistribution === 'normal') {
        // Calculate expected service time for normal distribution
        return serviceMean; // Example calculation of expected service time
    } else if (serviceDistribution === 'uniform') {
        // Calculate expected service time for uniform distribution
        const uniformMin = serviceMean - 0.5; // Example minimum value for uniform distribution
        const uniformMax = serviceMean + 0.5; // Example maximum value for uniform distribution

        return (uniformMax - uniformMin) / 2; // Example calculation of expected service time
    }
    return 0; // Default value if distribution is not recognized
};


  return (
    <div className="flex flex-col items-center w-full" style={{ backgroundColor: 'black', opacity: '0.9'  }}>
      <div className="w-full max-w-3xl flex justify-center space-x-4 my-8">
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${activeTab === 'random' ? 'active' : ''}`}
          onClick={() => handleTabChange('random')}
        >
          Random Data
        </button>
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${activeTab === 'calculated' ? 'active' : ''}`}
          onClick={() => handleTabChange('calculated')}
        >
          Calculated Data
        </button>
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${activeTab === 'graphical' ? 'active' : ''}`}
          onClick={() => handleTabChange('graphical')}
        >
          Graphical View
        </button>
      </div>

      <div className="w-full">
        {activeTab === 'random' && (
          <>
            <p className="text-center text-lg text-gray-300 underline">Using Service Distribution: {serviceDistribution}</p>
            <p className="text-center text-lg text-gray-300 underline">Using Arrival Distribution: {arrivalDistribution}</p>


            <RandomDataTabGG1 randomData={randomData} />
          </>
        )}
        {activeTab === 'calculated' && (
          <>
            <p className="text-center text-lg text-gray-300 underline">Using Service Distribution: {serviceDistribution}</p>
            <p className="text-center text-lg text-gray-300 underline">Using Arrival Distribution: {arrivalDistribution}</p>
            <CalculatedDataTabGG1 calculatedData={calculatedData} />
          </>
        )}
        {activeTab === 'graphical' && (
          <>
            <p className="text-center text-lg text-gray-300 underline">Using Service Distribution: {serviceDistribution}</p>
            <p className="text-center text-lg text-gray-300 underline">Using Arrival Distribution: {arrivalDistribution}</p>
            <GraphicalViewTabGG1 calculatedData={calculatedData} />
          </>
        )}
      </div>

    </div>
  );
};

export default SimulationGG1;
