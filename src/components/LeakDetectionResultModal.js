// src/components/LeakDetectionResultModal.js
import React from 'react';
import './LeakDetectionResultModal.css';
import moment from 'moment-timezone';

const LeakDetectionResultModal = ({ results, onClose }) => {
  const isOutsideWorkingHours = (time) => {
    const momentTime = moment(time);
    const day = momentTime.day();
    const hour = momentTime.hour();

    // Monday to Friday, 8:00 to 17:00
    const isWorkingDay = day >= 1 && day <= 5;
    const isWorkingHour = hour >= 8 && hour < 17;

    return !(isWorkingDay && isWorkingHour);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Leak Detection Results</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Field</th>
                <th>Leak (LPM)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.time}</td>
                  <td>{result.field}</td>
                  <td className={parseFloat(result.leak) > 0.5 && isOutsideWorkingHours(result.time) ? 'highlight' : ''}>
                    {result.leak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LeakDetectionResultModal;
