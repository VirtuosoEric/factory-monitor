// src/components/FactoryLayout.js
import React, { useState, useEffect } from 'react';
import './FactoryLayout.css';
import Gauge from './Gauge';

const FactoryLayout = ({ isAdding, setIsAdding }) => {
  const [hoveredSensor, setHoveredSensor] = useState(null);
  const [sensors, setSensors] = useState([
    { id: 1, value: 12, top: '10%', left: '20%' },
    { id: 2, value: 35, top: '30%', left: '40%' },
    // Add more sensors as needed
  ]);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

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
      const layout = e.target.getBoundingClientRect();
      const top = ((e.clientY - layout.top) / layout.height) * 100;
      const left = ((e.clientX - layout.left) / layout.width) * 100;

      const id = prompt('Enter sensor ID:');
      const name = prompt('Enter sensor name:');

      setSensors([...sensors, { id: sensors.length + 1, value: 0, top: `${top}%`, left: `${left}%`, name }]);
      setIsAdding(false);
    }
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
      {isAdding && (
        <div
          className="sensor-dot sensor-dot-preview"
          style={{ top: `${cursorPosition.top}%`, left: `${cursorPosition.left}%` }}
        ></div>
      )}
    </div>
  );
};

export default FactoryLayout;
