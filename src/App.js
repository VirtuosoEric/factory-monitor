// src/App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import FactoryLayout from './components/FactoryLayout';
import LeakDetectionModal from './components/LeakDetectionModal';
import LeakDetectionResultModal from './components/LeakDetectionResultModal';
import './App.css';

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [sensors, setSensors] = useState([
    { id: 1, value: getRandomSensorValue(), top: '10%', left: '20%', name: 'Sensor 1', field: 'Field A' },
    { id: 2, value: getRandomSensorValue(), top: '30%', left: '40%', name: 'Sensor 2', field: 'Field B' },
    // Add more sensors as needed
  ]);
  const [showLeakModal, setShowLeakModal] = useState(false);
  const [showLeakResultModal, setShowLeakResultModal] = useState(false);
  const [leakDetectionResults, setLeakDetectionResults] = useState([]);

  function getRandomSensorValue() {
    return (Math.random() * (15 - 5) + 5).toFixed(2);
  }

  function getRandomLeakValue() {
    return (Math.random() * (40 - 5) + 5).toFixed(2);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => ({ ...sensor, value: getRandomSensorValue() }))
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAddSensorClick = () => {
    setIsAdding(true);
  };

  const handleSaveSensor = (sensor) => {
    setSensors([...sensors, { ...sensor, value: getRandomSensorValue() }]);
    setIsAdding(false);
  };

  const handleDetectLeakClick = () => {
    setShowLeakModal(true);
  };

  const handleSaveLeakDetection = (settings) => {
    const results = generateLeakDetectionResults(settings);
    setLeakDetectionResults(results);
    setShowLeakModal(false);
    setShowLeakResultModal(true);
  };

  const generateLeakDetectionResults = (settings) => {
    const { startDate, endDate, startTime, endTime, field } = settings;
    const results = [];
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    // Ensure we clone the time properly
    let time = new Date(start);

    while (time <= end) {
      const hour = time.getHours();
      const day = time.getDay();
      let leak = '0.00';
      if (day >= 1 && day <= 5 && hour >= 8 && hour < 17) {
        leak = getRandomLeakValue();
      }

      results.push({
        time: time.toISOString().slice(0, 19).replace('T', ' '),
        field,
        leak
      });

      // Increment time by one hour
      time = new Date(time.getTime() + 60 * 60 * 1000);
    }

    return results;
  };

  // Extract unique fields from sensors
  const fields = Array.from(new Set(sensors.map(sensor => sensor.field)));

  return (
    <div className="App">
      <Sidebar sensors={sensors} onAddSensor={handleAddSensorClick} onDetectLeak={handleDetectLeakClick} />
      <FactoryLayout sensors={sensors} isAdding={isAdding} setIsAdding={setIsAdding} onSaveSensor={handleSaveSensor} />
      {showLeakModal && <LeakDetectionModal fields={fields} onSave={handleSaveLeakDetection} onClose={() => setShowLeakModal(false)} />}
      {showLeakResultModal && <LeakDetectionResultModal results={leakDetectionResults} onClose={() => setShowLeakResultModal(false)} />}
    </div>
  );
}

export default App;
