import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProgramList from './components/ProgramList';
import ProgramDetails from './components/ProgramDetails';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-innerbhakti-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ProgramList />} />
            <Route path="/program/:id" element={<ProgramDetails />} />
            <Route path="/player/:id" element={<AudioPlayer />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
