import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from 'screens/Auth/LoginScreen';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </div>
  );
}

export default App;
