import React, { useState } from 'react';
import './InputPage.css';
const Queuinggg1 = () => {
    const [lambdaValue, setLambdaValue] = useState(''); // Rename lambda to lambdaValue
    const [muValue, setMuValue] = useState(''); // Rename mu to muValue
    const [showOutput, setShowOutput] = useState(false); // Track whether to show the output
    const [maxarrValue, setmaxarrValue] = useState(''); //  maxValue of arrivalvariance
    const [minarrValue, setminarrValue] = useState(''); //  minValue of arrivalvariance
    const [maxserValue, setmaxserValue] = useState(''); //  maxValue of Servidevariance
    const [minserValue, setminserValue] = useState(''); //  minValue of Servidevariance
    

    const handleLambdaChange = (e) => {
        setLambdaValue(e.target.value); // Use setLambdaValue
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
        const interarrivaltime = 1 / lambdaValue; // Use lambdaValue
        const servicetime = 1 / muValue; // Use muValue
        const p = lambdaValue/muValue;
        const arrvariance = Math.pow((maxarrValue-maxarrValue),2)/12
        const servariance = Math.pow((maxserValue-minserValue),2)/12
        //ca=arrivalvariance/(1/lambda)^2
        const ca= (arrvariance)/(Math.pow((1/lambdaValue),2));
        //cs=servicevariance/(1/mu)^2
        const cs= (servariance)/(Math.pow((1/muValue),2));
        //lq= p^2(1+Cs)(Ca +p^2*Cs)/2*(1-p)*(1+p^2*Cs)
        const Lq = (Math.pow(p,2)*(1+cs)*(ca + (Math.pow(p,2)*cs)))/(2*(1-p)*(1 + (Math.pow(p,2)*cs)));
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
            
            <h2>G/G/1 Queue Simulation</h2>
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

export default Queuinggg1;
