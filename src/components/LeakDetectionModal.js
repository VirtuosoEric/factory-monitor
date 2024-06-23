import React, { useState } from 'react';
import './LeakDetectionModal.css';

const LeakDetectionModal = ({ fields, onSave, onClose, userTimezone }) => {
  const [settings, setSettings] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    field: fields[0] || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Leak Detection Settings</h2>
        <label>
          Start Date:
          <input type="date" name="startDate" value={settings.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={settings.endDate} onChange={handleChange} />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={settings.startTime} onChange={handleChange} />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={settings.endTime} onChange={handleChange} />
        </label>
        <label>
          Field:
          <select name="field" value={settings.field} onChange={handleChange}>
            {fields.map((field, index) => (
              <option key={index} value={field}>{field}</option>
            ))}
          </select>
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default LeakDetectionModal;
