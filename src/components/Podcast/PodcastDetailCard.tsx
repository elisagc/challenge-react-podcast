import classes from './PodcastDetailCard.module.css';
import { Podcast } from '../../interfaces/podcast';

interface Props {
  podcast: Podcast;
}

const PodcastDetailCard = ({ podcast }: Props) => {
  return (
    <div className={classes['podcast-card']}>
      <div className={classes['podcast-card__image']}>
        <img src={podcast.image} alt={podcast.title} />
      </div>

      <div className={classes['podcast-card__title']}>
        <h2>{podcast.title}</h2>
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
