import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ProgramDetails = () => {
  const { id } = useParams();
  
  const courseData = {
    title: 'The Medito Course',
    description: 'The Medito course will help you to learn more about yourself, and the world around you. Join us on this transformative journey of mindfulness, compassion and insight.',
    sections: [
      {
        title: 'Getting started',
        subtitle: 'A few short intro sessions',
        tracks: [
          { id: 1, title: 'Introduction to Meditation', duration: '5 min' },
          { id: 2, title: 'Basic Breathing', duration: '8 min' }
        ]
      },
      {
        title: 'Learning to sit',
        subtitle: 'Building up to 10 minutes',
        tracks: [
          { id: 3, title: 'Posture Guide', duration: '7 min' },
          { id: 4, title: 'First 10-Minute Session', duration: '10 min' }
        ]
      },
      {
        title: 'Mindfulness',
        subtitle: 'Build your practice',
        tracks: [
          { id: 5, title: 'Body Scan', duration: '12 min' },
          { id: 6, title: 'Mindful Walking', duration: '15 min' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-64">
        <img
          src="/api/placeholder/800/400"
          alt={courseData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Link to="/" className="p-2 rounded-full bg-black/20 text-white">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
        <p className="text-gray-600 mb-8">{courseData.description}</p>

        <div className="space-y-8">
          {courseData.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{section.subtitle}</p>
              
              <div className="space-y-3">
                {section.tracks.map((track) => (
                  <Link
                    key={track.id}
                    to={`/player/${track.id}`}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{track.title}</h3>
                        <p className="text-sm text-gray-500">{track.duration}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innerbhakti-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;