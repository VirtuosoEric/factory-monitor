// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FactoryLayout from './components/FactoryLayout';
import LeakDetectionModal from './components/LeakDetectionModal';
import './App.css';

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [sensors, setSensors] = useState([
    { id: 1, value: 12, top: '10%', left: '20%', name: 'Sensor 1', field: 'Field A' },
    { id: 2, value: 35, top: '30%', left: '40%', name: 'Sensor 2', field: 'Field B' },
    // Add more sensors as needed
  ]);
  const [showLeakModal, setShowLeakModal] = useState(false);

  const handleAddSensorClick = () => {
    setIsAdding(true);
  };

  const handleSaveSensor = (sensor) => {
    setSensors([...sensors, sensor]);
    setIsAdding(false);
  };

  const handleDetectLeakClick = () => {
    setShowLeakModal(true);
  };

  const handleSaveLeakDetection = (settings) => {
    console.log('Leak Detection Settings:', settings);
    setShowLeakModal(false);
  };

  // Extract unique fields from sensors
  const fields = Array.from(new Set(sensors.map(sensor => sensor.field)));

  return (
    <div className="App">
      <Sidebar sensors={sensors} onAddSensor={handleAddSensorClick} onDetectLeak={handleDetectLeakClick} />
      <FactoryLayout sensors={sensors} isAdding={isAdding} setIsAdding={setIsAdding} onSaveSensor={handleSaveSensor} />
      {showLeakModal && <LeakDetectionModal fields={fields} onSave={handleSaveLeakDetection} onClose={() => setShowLeakModal(false)} />}
    </div>
  );
}

export default App;
