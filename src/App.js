import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/landingPage';
import MM1Model from './components/MM1Model';
import MM2Model from './components/MM2Model';
import GG1Model from './components/GG1Model';
import GG2Model from './components/GG2Model';
import SimulationMM1 from './components/SimulationMM1';
import SimulationMM2 from './components/SimulationMM2';
import MG1Model from './components/MG1Model';
import MG2Model from './components/MG2Model';
import SimulationMG1 from './components/SimulationMG1';
import SimulationGG1 from './components/SimulationGG1';
import SimulationMG2 from './components/SimulationMG2';
import SimulationGG2 from './components/SimulationGG2';
import Queuingmm1 from './components/Queuing/Queuingmm1';
import Queuingmmc from './components/Queuing/Queuingmmc';
import Queuingmg1 from './components/Queuing/Queuingmg1';
import Queuingmgc from './components/Queuing/Queuingmgc';
import Queuinggg1 from './components/Queuing/Queuinggg1';
import Queuingggc from './components/Queuing/Queuingggc';
import Home from './components/Queuing/Home';
import './index.css';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home/>}/>
        <Route path="Home/Queuingmm1" element={<Queuingmm1 />} />
        <Route path="Home/Queuingmmc" element={<Queuingmmc />} />
        <Route path="Home/Queuingmg1" element={<Queuingmg1 />} />
        <Route path="Home/Queuingmgc" element={<Queuingmgc />} />
        <Route path="Home/Queuinggg1" element={<Queuinggg1 />} />
        <Route path="Home/Queuingggc" element={<Queuingggc />} />
        <Route path="/mm1" element={<MM1Model />} />
        <Route path="/mm2" element={<MM2Model />} />
        <Route path="/mg1" element={<MG1Model />} />
        <Route path="/mg2" element={<MG2Model />} />
        <Route path="/gg1" element={<GG1Model />} />
        <Route path="/gg2" element={<GG2Model />} />
        <Route path="/simulationmm1" element={<SimulationMM1 />} />
        <Route path="/simulationmg1" element={<SimulationMG1 />} />
        <Route path="/simulationgg1" element={<SimulationGG1 />} />
        <Route path="/simulationmm2" element={<SimulationMM2 />} />
        <Route path="/simulationmg2" element={<SimulationMG2 />} />
        <Route path="/simulationgg2" element={<SimulationGG2 />} />
      </Routes>
    </Router>
  );
}

export default App;