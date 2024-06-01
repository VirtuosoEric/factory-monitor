// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FactoryLayout from './components/FactoryLayout';
import './App.css';

function App() {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSensorClick = () => {
    setIsAdding(true);
  };

  return (
    <div className="App">
      <Sidebar onAddSensor={handleAddSensorClick} />
      <FactoryLayout isAdding={isAdding} setIsAdding={setIsAdding} />
    </div>
  );
}

export default App;
