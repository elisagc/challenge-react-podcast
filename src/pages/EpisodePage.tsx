import React from 'react';
import { useLocation } from 'react-router-dom';
import { Podcast, PodcastEpisode } from '../interfaces/podcast';
import PodcastDetailCard from '../components/Podcast/PodcastDetailCard';
import classes from './EpisodePage.module.css';
import EpisodeCard from '../components/Episode/EpisodeCard';
const EpisodePage = () => {
  const location = useLocation();
  const { podcast, episode } = location.state as {
    podcast: Podcast;
    episode: PodcastEpisode;
  };
  return (
    <div className={classes['episode-page']}>
      <PodcastDetailCard podcast={podcast} />
      <div className={classes['episode-page__episode']}>
        <EpisodeCard episode={episode} />
      </div>
    </div>
  );
};

export default EpisodePage;
