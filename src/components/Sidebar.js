// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onAddSensor }) => {
  return (
    <div className="sidebar">
      <h2>Devices</h2>
      <ul>
        <li>Generator-S</li>
        <li>Generator-M</li>
        <li>Battery-S</li>
        <li>Battery-M</li>
        {/* Add more devices as needed */}
      </ul>
      <button onClick={onAddSensor} className="add-sensor-button">Add Sensor</button>
    </div>
  );
};

export default Sidebar;
