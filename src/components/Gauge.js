// src/components/Gauge.js
import React, { useEffect, useRef } from 'react';
import './Gauge.css';

const Gauge = ({ value }) => {
  const gaugeRef = useRef(null);

  useEffect(() => {
    const gaugeElement = gaugeRef.current;
    const max = 70;
    const angle = ((value / max) * 180) - 90;

    gaugeElement.style.setProperty('--gauge-rotate', `${angle}deg`);
    gaugeElement.style.setProperty('--gauge-color', getColor(value));
  }, [value]);

  const getColor = (value) => {
    if (value <= 5) return '#C83232'; // Leaking
    if (value <= 15) return '#32C832'; // Normal
    if (value > 40) return '#C83232'; // Heavy
    return '#CCCC32'; // Medium
  };

  return (
    <div className="gauge-container">
      <div className="gauge">
        <div className="gauge-needle" ref={gaugeRef}></div>
        <div className="gauge-center"></div>
      </div>
      <div className="gauge-labels">
        <span>0</span>
        <span>35</span>
        <span>70</span>
      </div>
      <div className="gauge-value">
        {value} LPM
      </div>
    </div>
  );
};

export default Gauge;
