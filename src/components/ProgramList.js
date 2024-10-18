import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const ProgramList = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: 'Work Stress',
      subtitle: '20 Days Plan',
      image: '/api/placeholder/400/300',
      locked: true
    },
    {
      id: 2,
      title: 'The Medito Course',
      subtitle: '15 Days Plan',
      image: '/api/placeholder/400/300',
      locked: false
    },
    // Add more sample programs here
  ]);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-innerbhakti-dark">Prarthana Plans</h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {programs.map((program) => (
          <Link
            key={program.id}
            to={`/program/${program.id}`}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{program.title}</h3>
              <p className="text-sm opacity-90">{program.subtitle}</p>
            </div>
            {program.locked && (
              <div className="absolute top-4 right-4">
                <Lock className="h-5 w-5 text-white" />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProgramList;