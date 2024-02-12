import React, { useState } from 'react';
import './InputPage.css';

const Queuingmmc = () => {
    const [lambdaValue, setLambdaValue] = useState(''); // Rename lambda to lambdaValue
    const [muValue, setMuValue] = useState(''); // Rename mu to muValue
    const [cValue, setcValue] = useState('');
    const [showOutput, setShowOutput] = useState(false); // Track whether to show the output

    const handleLambdaChange = (e) => {
        setLambdaValue(e.target.value); // Use setLambdaValue
    };
    const handlecChange = (e) => {
        setcValue(e.target.value); // Use setcValue
    };

    const handleMuChange = (e) => {
        setMuValue(e.target.value); // Use setMuValue
    };

    const handleSubmit = () => {
        setShowOutput(true);
    };

    const simulateQueue = () => {
        // Calculate c factorial
        function factorial(n) {
            if (n === 0 || n === 1) {
                return 1;
            }
            return n * factorial(n - 1);
        }
        
    
        const interarrivaltime = 1 / lambdaValue; // Use lambdaValue
        const servicetime = 1 / muValue; // Use muValue
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
        //Lq + λ / μ
        const Ls = Lq + lambdaValue/muValue;
        //Lq / λ
        const Wq = Lq/lambdaValue;
        //Wq + 1 / μ
        const Ws = Wq + 1/muValue;
        const customerData = [
            {
                lambda: lambdaValue,
                mu: muValue,
                interarrivaltime,
                servicetime,
                po,
                Lq,
                Ls,
                Wq,
                Ws
            },
        ];

        return customerData;
    };

    return (
        <div className="input-container">
            <h2>M/M/C Queue Simulation</h2>
            <div className="input-form">
                <label>Arrival Rate (λ):</label>
                <input type="text" value={lambdaValue} onChange={handleLambdaChange} />

                <label>Service Rate (μ):</label>
                <input type="text" value={muValue} onChange={handleMuChange} />

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
                            <p>Probabilty of idle: {customer.po}</p>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Queuingmmc;
