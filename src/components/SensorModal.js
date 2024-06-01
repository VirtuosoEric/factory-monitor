// src/components/SensorModal.js
import React, { useState } from 'react';
import './SensorModal.css';

const SensorModal = ({ onSave, onClose }) => {
  const [sensorId, setSensorId] = useState('');
  const [sensorName, setSensorName] = useState('');
  const [sensorField, setSensorField] = useState('');

  const handleSave = () => {
    onSave({ id: sensorId, name: sensorName, field: sensorField });
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content" onClick={handleModalClick}>
        <h2>Add Sensor</h2>
        <label>
          Sensor ID:
          <input
            type="text"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          />
        </label>
        <label>
          Sensor Name:
          <input
            type="text"
            value={sensorName}
            onChange={(e) => setSensorName(e.target.value)}
          />
        </label>
        <label>
          Sensor Field:
          <input
            type="text"
            value={sensorField}
            onChange={(e) => setSensorField(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SensorModal;
