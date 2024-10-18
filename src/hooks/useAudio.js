import { useState, useEffect, useCallback } from 'react';

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const toggle = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const updateTime = useCallback(() => {
    setCurrentTime(audio.currentTime);
  }, [audio]);

  const setTime = useCallback((time) => {
    audio.currentTime = time;
    setCurrentTime(time);
  }, [audio]);

  const updateVolume = useCallback((value) => {
    audio.volume = value;
    setVolume(value);
  }, [audio]);

  useEffect(() => {
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', () => setPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio, updateTime]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  return {
    playing,
    toggle,
    currentTime,
    duration,
    setTime,
    volume,
    updateVolume,
  };
};

export default useAudio;