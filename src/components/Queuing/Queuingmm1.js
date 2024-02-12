import React, { useState } from 'react';
import './InputPage.css';

const Queuingmm1 = () => {
    const [lambdaValue, setLambdaValue] = useState(''); // Rename lambda to lambdaValue
    const [muValue, setMuValue] = useState(''); // Rename mu to muValue
    const [showOutput, setShowOutput] = useState(false); // Track whether to show the output

    const handleLambdaChange = (e) => {
        setLambdaValue(e.target.value); // Use setLambdaValue
    };

    const handleMuChange = (e) => {
        setMuValue(e.target.value); // Use setMuValue
    };

    const handleSubmit = () => {
        setShowOutput(true);
    };

    const simulateQueue = () => {
        const containerStyle = {
            backgroundColor: 'purple', // Set your custom background color here
          };
        const interarrivaltime = 1 / lambdaValue; // Use lambdaValue
        const servicetime = 1 / muValue; // Use muValue
        const Lq = (Math.pow(lambdaValue, 2) / muValue) * (muValue - lambdaValue);
        const Ls = lambdaValue / (muValue - lambdaValue);
        const Wq = lambdaValue / (muValue * (muValue - lambdaValue));
        const Ws = 1 / (lambdaValue - muValue);
        const customerData = [
            {
                lambda: lambdaValue,
                mu: muValue,
                interarrivaltime,
                servicetime,
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
            <h2>M/M/1 Queue Simulation</h2>
            <div className="input-form">
                <label>Arrival Rate (λ):</label>
                <input type="text" value={lambdaValue} onChange={handleLambdaChange} />

                <label>Service Rate (μ):</label>
                <input type="text" value={muValue} onChange={handleMuChange} />

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
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Queuingmm1;
