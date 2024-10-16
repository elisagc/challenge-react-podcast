import React, { useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeOffIcon } from 'lucide-react';
import classes from './Player.module.css';
import { formatTime } from '../../utils/format';

const Player = ({ trackUrl }: { trackUrl: string }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(trackUrl));
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progressValue, setProgressValue] = React.useState(0);
  const [currentDuration, setCurrentDuration] = React.useState(0);

  const handleChangeProgress = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgressValue(value);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audioRef.current) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgressValue(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setCurrentDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (trackUrl) audioRef.current.src = trackUrl;
  }, [trackUrl]);

  return (
    <div className={classes.player}>
      <button
        className={classes.playButton}
        onClick={togglePlayPause}
        disabled={!trackUrl}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <div className={classes['slider-container']}>
        <input
          className={classes.slider}
          type="range"
          step={1}
          value={progressValue}
          min={0}
          max={currentDuration}
          onChange={({ target: { value } }) => {
            handleChangeProgress(+value);
          }}
        />

        <span className={classes.duration}>{formatTime(progressValue)}</span>
      </div>
      <button className={classes.volumeButton} onClick={handleMute}>
        {audioRef.current?.muted ? (
          <VolumeOffIcon size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>
      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
