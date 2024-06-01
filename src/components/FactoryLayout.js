// src/components/FactoryLayout.js
import React, { useState, useEffect } from 'react';
import './FactoryLayout.css';
import Gauge from './Gauge';
import SensorModal from './SensorModal';

const FactoryLayout = ({ isAdding, setIsAdding }) => {
  const [hoveredSensor, setHoveredSensor] = useState(null);
  const [sensors, setSensors] = useState([
    { id: 1, value: 12, top: '10%', left: '20%', name: 'Sensor 1', field: 'Field A' },
    { id: 2, value: 35, top: '30%', left: '40%', name: 'Sensor 2', field: 'Field B' },
    // Add more sensors as needed
  ]);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const layout = e.target.getBoundingClientRect();
      const top = ((e.clientY - layout.top) / layout.height) * 100;
      const left = ((e.clientX - layout.left) / layout.width) * 100;
      setCursorPosition({ top, left });
    };

    if (isAdding) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAdding]);

  const handleLayoutClick = (e) => {
    if (isAdding) {
      e.stopPropagation(); // Prevent the click event from bubbling up
      setShowModal(true);
    }
  };

  const handleSaveSensor = ({ id, name, field }) => {
    setSensors([...sensors, { id, value: 0, top: `${cursorPosition.top}%`, left: `${cursorPosition.left}%`, name, field }]);
    setIsAdding(false);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsAdding(false);
  };

  return (
    <div className="factory-layout" onClick={handleLayoutClick}>
      {sensors.map(sensor => (
        <div
          key={sensor.id}
          className="sensor-dot"
          style={{ top: sensor.top, left: sensor.left }}
          onMouseEnter={() => setHoveredSensor(sensor.id)}
          onMouseLeave={() => setHoveredSensor(null)}
        >
          {hoveredSensor === sensor.id && (
            <div className="sensor-value">
              <Gauge value={sensor.value} />
            </div>
          )}
        </div>
      ))}
      {isAdding && !showModal && (
        <div
          className="sensor-dot sensor-dot-preview"
          style={{ top: `${cursorPosition.top}%`, left: `${cursorPosition.left}%` }}
        ></div>
      )}
      {showModal && (
        <SensorModal onSave={handleSaveSensor} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default FactoryLayout;
