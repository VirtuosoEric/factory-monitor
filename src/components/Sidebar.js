// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ sensors, onAddSensor, onDetectLeak }) => {
  // Group sensors by field
  const groupedSensors = sensors.reduce((acc, sensor) => {
    const { field } = sensor;
    if (!acc[field]) {
      acc[field] = [];
    }
    acc[field].push(sensor);
    return acc;
  }, {});

  return (
    <div className="sidebar">
      <button onClick={onAddSensor} className="add-sensor-button">Add Sensor</button>
      <button onClick={onDetectLeak} className="detect-leak-button">Detect Leak</button>
      <h2>Sensors</h2>
      <div className="sensor-list">
        {Object.keys(groupedSensors).map(field => (
          <div key={field} className="sensor-group">
            <h3>{field}</h3>
            <ul>
              {groupedSensors[field].map(sensor => (
                <li key={sensor.id}>
                  <div>ID: {sensor.id}</div>
                  <div>Name: {sensor.name}</div>
                  <div>Value: {sensor.value} LPM</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
