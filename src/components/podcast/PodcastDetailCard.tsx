import classes from './PodcastDetailCard.module.css';
import { Podcast } from '../../interfaces/podcast';
import { Link } from 'react-router-dom';

interface Props {
  podcast: Podcast;
}

const PodcastDetailCard = ({ podcast }: Props) => {
  return (
    <div className={classes['podcast-card']}>
      <div className={classes['podcast-card__image']}>
        <Link to={`/podcast/${podcast.id}`}>
          <img src={podcast.image} alt={podcast.title} />
        </Link>
      </div>

      <div className={classes['podcast-card__title']}>
        <Link to={`/podcast/${podcast.id}`}>
          <h2>{podcast.title}</h2>
        </Link>
        <p>by {podcast.artist}</p>
      </div>

      <div className={classes['podcast-card__description']}>
        <h3>Description:</h3>
        <p>{podcast.description}</p>
      </div>
    </div>
  );
};

export default PodcastDetailCard;
