// src/components/LeakDetectionResultModal.js
import React from 'react';
import './LeakDetectionResultModal.css';

const LeakDetectionResultModal = ({ results, onClose }) => {
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
                  <td>{result.leak}</td>
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
