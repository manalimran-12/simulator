import React, { useState } from 'react';
import './InputPage.css';

const Queuingggc = () => {
    const [lambdaValue, setLambdaValue] = useState(''); // Rename lambda to lambdaValue
    const [muValue, setMuValue] = useState(''); // Rename mu to muValue
    const [showOutput, setShowOutput] = useState(false); // Track whether to show the output
    const [maxarrValue, setmaxarrValue] = useState(''); //  maxValue of arrivalvariance
    const [minarrValue, setminarrValue] = useState(''); //  minValue of arrivalvariance
    const [maxserValue, setmaxserValue] = useState(''); //  maxValue of Servidevariance
    const [minserValue, setminserValue] = useState(''); //  minValue of Servidevariance
    const [cValue, setcValue] = useState(''); //no of servers
    

    const handleLambdaChange = (e) => {
        setLambdaValue(e.target.value); // Use setLambdaValue
    };
    const handlecChange = (e) => {
        setcValue(e.target.value); // Use setcValue
    };
    const handleMuChange = (e) => {
        setMuValue(e.target.value); // Use setMuValue
    };
    const handlemaxarrChange = (e) => {
        setmaxarrValue(e.target.value); // Use setmaxValue
    };
    const handleminarrChange = (e) => {
        setminarrValue(e.target.value); // Use setminValue
    };
    const handlemaxserChange = (e) => {
        setmaxserValue(e.target.value); // Use setmaxValue
    };
    const handleminserChange = (e) => {
        setminserValue(e.target.value); // Use setminValue
    };
    

    const handleSubmit = () => {
        setShowOutput(true);
    };
    

    const simulateQueue = () => {
        function factorial(n) {
            if (n === 0 || n === 1) {
                return 1;
            }
            return n * factorial(n - 1);
        }

        function Wqmmc(lambda,mu) {
        const p = lambdaValue/cValue*muValue;
        //lq = (po*(lambda/mu)^c*p)/c!(1-p)
        //po=1/[c-1Em=0(((c*p)^m)/m!)+(((c*p)^c))/(c!(1-p)))]
        let summationResult = 0;

        for (let m = 0; m < cValue - 1; m++) {
            summationResult += Math.pow((cValue * p), m) / factorial(m);
        }

        const poNumerator = Math.pow((cValue * p), cValue) / factorial(cValue);
        const poDenominator = factorial(cValue) * (1 - p);

        const po = 1 / (summationResult + poNumerator / poDenominator);
        
        const Lq = (po*(Math.pow((lambdaValue / muValue), cValue) * p) * p)/factorial(cValue) * (1 - p);
        const Wq = Lq/lambdaValue;

        return Wq;


        }
        const interarrivaltime = 1 / lambdaValue; // Use lambdaValue
        const servicetime = 1 / muValue; // Use muValue
        const p = lambdaValue/cValue*muValue;
        const arrvariance = Math.pow((maxarrValue-maxarrValue),2)/12
        const servariance = Math.pow((maxserValue-minserValue),2)/12
        //ca=arrivalvariance/(1/lambda)^2
        const ca= (arrvariance)/(Math.pow((1/lambdaValue),2));
        //cs=servicevariance/(1/mu)^2 
        const cs= (servariance)/(Math.pow((1/muValue),2));
        //Wq ggc = Wq mmc * ca+cs/2 chnge
        const mmcWq = Wqmmc(lambdaValue,muValue);
        const Wq = mmcWq* ((ca+cs)/2);
        //Lq ggc= wqggc * lambda
        const Lq = Wq * lambdaValue;
        //ws= wq + 1/mu;
        const Ws = 1/muValue;
        //LS = lambda*Ws
        const Ls = lambdaValue*Ws;

        //1-p
        const po = 1-p;
        const customerData = [
            {
                lambda: lambdaValue,
                mu: muValue,
                interarrivaltime,
                servicetime,
                Lq,
                Ls,
                Wq,
                Ws,
                po,
            },
        ];

        return customerData;
    };

    return (
        <div className="input-container">
            <h2>G/G/C Queue Simulation</h2>
            <div className="input-form">
                <label>Arrival Rate (λ):</label>
                <input type="text" value={lambdaValue} onChange={handleLambdaChange} />

                <label>Service Rate (μ):</label>
                <input type="text" value={muValue} onChange={handleMuChange} />

                <label>Maximum Arrival (max):</label>
                <input type="text" value={maxarrValue} onChange={handlemaxarrChange} />

                <label>Minimum Arrival (min):</label>
                <input type="text" value={minarrValue} onChange={handleminarrChange} />
                
                <label>Maximum Service (max):</label>
                <input type="text" value={maxserValue} onChange={handlemaxserChange} />

                <label>Minimum Service (min):</label>
                <input type="text" value={minserValue} onChange={handleminserChange} />

                <label>No of Servers (c):</label>
                <input type="text" value={cValue} onChange={handlecChange} />

                <button onClick={handleSubmit}>Simulate</button>
            </div>

            {showOutput && (
                <div className="output-results">
                    <h3>Simulation Results</h3>
                    {simulateQueue().map((customer, index) => (
                        <div key={index}>
                            <p>Arrival Rate: {customer.lambda}</p>
                            <p>Service Rate: {customer.mu}</p>
                            <p>Avg Queue Length Lq: {customer.Lq}</p>
                            <p>Avg No of customer in System Ls: {customer.Ls}</p>
                            <p>Avg waiting time in queue Wq: {customer.Wq}</p>
                            <p>Avg waiting time in System Ws: {customer.Ws}</p>
                            <p>probab of idle: {customer.po}</p>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Queuingggc;
