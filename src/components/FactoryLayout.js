import React, { useState, useEffect } from 'react';
import './FactoryLayout.css';
import Gauge from './Gauge';
import SensorModal from './SensorModal';

const FactoryLayout = ({ sensors, isAdding, setIsAdding, onSaveSensor }) => {
  const [hoveredSensor, setHoveredSensor] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState(false);
  const [fixedPosition, setFixedPosition] = useState({ top: 0, left: 0 });

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

  const handleLayoutClick = () => {
    if (isAdding) {
      setFixedPosition(cursorPosition); // Capture the cursor position before showing the modal
      setShowModal(true);
    }
  };

  const handleSaveSensor = ({ id, name, field }) => {
    const newSensor = { id, name, field, value: 0, top: `${fixedPosition.top}%`, left: `${fixedPosition.left}%` };
    onSaveSensor(newSensor);
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
