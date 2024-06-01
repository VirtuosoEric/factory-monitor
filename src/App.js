// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FactoryLayout from './components/FactoryLayout';
import './App.css';

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [sensors, setSensors] = useState([
    { id: 1, value: 12, top: '10%', left: '20%', name: 'Sensor 1', field: 'Field A' },
    { id: 2, value: 35, top: '30%', left: '40%', name: 'Sensor 2', field: 'Field B' },
    // Add more sensors as needed
  ]);

  const handleAddSensorClick = () => {
    setIsAdding(true);
  };

  const handleSaveSensor = (sensor) => {
    setSensors([...sensors, sensor]);
    setIsAdding(false);
  };

  return (
    <div className="App">
      <Sidebar sensors={sensors} onAddSensor={handleAddSensorClick} />
      <FactoryLayout sensors={sensors} isAdding={isAdding} setIsAdding={setIsAdding} onSaveSensor={handleSaveSensor} />
    </div>
  );
}

export default App;
