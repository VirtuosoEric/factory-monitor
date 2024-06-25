import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
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

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function getRandomSensorValue() {
    return (Math.random() * (15 - 5) + 5).toFixed(2);
  }

  function getRandomLeakValue() {
    return (Math.random() * (40 - 5) + 5).toFixed(2);
  }

  function getSpecialLeakValue() {
    return (Math.random() * (5 - 0.1) + 0.1).toFixed(2);
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

    // Convert start and end dates to the user's timezone
    let start = moment.tz(`${startDate}T${startTime}`, 'Asia/Taipei');
    const end = moment.tz(`${endDate}T${endTime}`, 'Asia/Taipei');
    const specialStartDate = moment.tz('2024-04-10', 'Asia/Taipei');
    const specialEndDate = moment.tz('2024-04-15', 'Asia/Taipei');

    while (start <= end) {
        // Generate data for each hour between startTime and endTime
        let current = start.clone();
        const nextDayEnd = moment.tz(`${start.clone().add(1, 'day').format('YYYY-MM-DD')}T${endTime}`, 'Asia/Taipei');

        while (current <= nextDayEnd && current <= end) {
            const hour = current.hour();
            const day = current.day();
            let leak = '0.00';

            if (day >= 1 && day <= 5 && hour >= 8 && hour < 17) {
                leak = getRandomLeakValue();
            }

            if (current.isBetween(specialStartDate, specialEndDate, 'day', '[]')) {
                leak = getSpecialLeakValue();
            }

            let localTimeString = current.format('YYYY-MM-DD HH:mm:ss');
            console.log(localTimeString);

            results.push({
                time: localTimeString,
                field,
                leak
            });

            // Increment time by one hour
            current.add(1, 'hour');
        }

        // Move to the next day and set time to startTime
        start.add(1, 'day').set({ hour: moment.tz(startTime, 'HH:mm').hour(), minute: moment.tz(startTime, 'HH:mm').minute() });
    }

    return results;
};


  // Extract unique fields from sensors
  const fields = Array.from(new Set(sensors.map(sensor => sensor.field)));

  return (
    <div className="App">
      <Sidebar sensors={sensors} onAddSensor={handleAddSensorClick} onDetectLeak={handleDetectLeakClick} />
      <FactoryLayout sensors={sensors} isAdding={isAdding} setIsAdding={setIsAdding} onSaveSensor={handleSaveSensor} />
      {showLeakModal && <LeakDetectionModal fields={fields} onSave={handleSaveLeakDetection} onClose={() => setShowLeakModal(false)} userTimezone={userTimezone} />}
      {showLeakResultModal && <LeakDetectionResultModal results={leakDetectionResults} onClose={() => setShowLeakResultModal(false)} />}
    </div>
  );
}

export default App;
