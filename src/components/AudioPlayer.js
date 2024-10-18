import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Share2, 
  Heart, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Repeat
} from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(150); // 2:30 in seconds
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const trackData = {
    title: 'Raam Naam Jaap',
    subtitle: 'Siri Raam',
    coverImage: '/api/placeholder/400/400',
    audioUrl: 'https://example.com/audio.mp3' // Replace with actual audio URL
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: trackData.title,
          text: `Listen to ${trackData.title} by ${trackData.subtitle}`,
          url: window.location.href,
        });
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-innerbhakti-orange to-innerbhakti-yellow">
      <audio
        ref={audioRef}
        src={trackData.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => {
          if (isRepeat) {
            audioRef.current.play();
          } else {
            setIsPlaying(false);
            setCurrentTime(0);
          }
        }}
      />

      <div className="p-6">
       
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
            <X className="h-6 w-6" />
          </Link>
          <h2 className="text-white font-medium">Now Playing</h2>
          <div className="w-6" />
        </div>

       
        <div className="mt-12 flex flex-col items-center">
          <div className="w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={trackData.coverImage}
              alt={trackData.title}
              className="w-full h-full object-cover"
            />
          </div>

       
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-white">{trackData.title}</h1>
            <p className="text-white/80 mt-1">{trackData.subtitle}</p>
          </div>

          
          <div className="w-full mt-8">
            <div 
              ref={progressRef}
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/80">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

       
          <div className="mt-8 flex items-center justify-center space-x-8">
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <Repeat className={`h-5 w-5 ${isRepeat ? 'text-innerbhakti-orange' : ''}`} />
            </button>
            
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, currentTime - 10);
                }
              }}
            >
              <SkipBack className="h-8 w-8" />
            </button>

            <button 
              className="bg-white rounded-full p-4 hover:bg-white/90 transition-colors"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-innerbhakti-orange" />
              ) : (
                <Play className="h-8 w-8 text-innerbhakti-orange" />
              )}
            </button>

            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                }
              }}
            >
              <SkipForward className="h-8 w-8" />
            </button>

            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            </button>
          </div>

       
          <div className="mt-8 flex items-center space-x-4 w-full max-w-xs">
            <Volume2 className="h-5 w-5 text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
            />
          </div>

        
          <button 
            onClick={handleShare}
            className="mt-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;