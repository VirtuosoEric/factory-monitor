// src/components/LeakDetectionModal.js
import React, { useState } from 'react';
import './LeakDetectionModal.css';

const LeakDetectionModal = ({ fields, onSave, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedField, setSelectedField] = useState(fields.length > 0 ? fields[0] : '');

  const handleSave = () => {
    onSave({ startDate, endDate, startTime, endTime, field: selectedField });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Leak Detection Settings</h2>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Detection Field:
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            {fields.map((field, index) => (
              <option key={index} value={field}>{field}</option>
            ))}
          </select>
        </label>
        <button onClick={handleSave}>Start</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default LeakDetectionModal;
