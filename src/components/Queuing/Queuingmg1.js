import React, { useState } from 'react';
import './InputPage.css';

const Queuingmg1 = () => {
    const [lambdaValue, setLambdaValue] = useState(''); // Rename lambda to lambdaValue
    const [muValue, setMuValue] = useState(''); // Rename mu to muValue
    const [showOutput, setShowOutput] = useState(false); // Track whether to show the output
    const [maxValue, setmaxValue] = useState(''); //  maxValue of variance
    const [minValue, setminValue] = useState(''); //  minValue of variance
    

    const handleLambdaChange = (e) => {
        setLambdaValue(e.target.value); // Use setLambdaValue
    };

    const handleMuChange = (e) => {
        setMuValue(e.target.value); // Use setMuValue
    };
    const handlemaxChange = (e) => {
        setmaxValue(e.target.value); // Use setmaxValue
    };
    const handleminChange = (e) => {
        setminValue(e.target.value); // Use setminValue
    };

    const handleSubmit = () => {
        setShowOutput(true);
    };

    const simulateQueue = () => {
        const interarrivaltime = 1 / lambdaValue; // Use lambdaValue
        const servicetime = 1 / muValue; // Use muValue
        const p = lambdaValue/muValue;
        const variance = Math.pow((maxValue-minValue),2)/12;
        //lq = lambda^2*variance + p^2/2(1-p)
        const Lq = (Math.pow(lambdaValue,2)*variance*Math.pow(p,2))/(2*(1-p));
        //ws= wq + 1/mu;
        const Ws = 1/muValue;
        //LS = lambda*Ws
        const Ls = lambdaValue*Ws;
        //wq = lq/lambda;
        const Wq = Lq/lambdaValue;
        
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
            <h2>M/G/1 Queue Simulation</h2>
            <div className="input-form">
                <label>Arrival Rate (λ):</label>
                <input type="text" value={lambdaValue} onChange={handleLambdaChange} />

                <label>Service Rate (μ):</label>
                <input type="text" value={muValue} onChange={handleMuChange} />

                <label>Maximum service (max):</label>
                <input type="text" value={maxValue} onChange={handlemaxChange} />

                <label>Minimum service (min):</label>
                <input type="text" value={minValue} onChange={handleminChange} />

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

export default Queuingmg1;
