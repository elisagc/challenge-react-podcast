import React from 'react';
import { Podcast } from '../../interfaces/podcast';
import classes from './PodcastList.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  podcasts: Podcast[];
}

const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const navigate = useNavigate();
  return (
    <div
      className={classes['podcast-card']}
      onClick={() => navigate(`/podcast/${podcast.id}`, { state: podcast })}
    >
      <div className={classes['podcast-card__image']}>
        <img src={podcast.image} alt={podcast.title} />
      </div>

      <div className={classes['podcast-card__info']}>
        <span className={classes['podcast-card__title']}>{podcast.title}</span>
        <span className={classes['podcast-card__artist']}>
          Author: {podcast.artist}
        </span>
      </div>
    </div>
  );
};

const PodcastList = ({ podcasts }: Props) => {
  return (
    <div className={classes['podcast-list']}>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastList;
