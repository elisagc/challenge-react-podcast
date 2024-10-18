import { PodcastEpisode } from '../../interfaces/podcast';
import Player from '../common/Player';
import classes from './EpisodeCard.module.css';

interface Props {
  episode: PodcastEpisode;
}
const EpisodeCard = ({ episode }: Props) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{episode.title}</h2>
      <p className={classes.description}>{episode.episodeDescription}</p>
      {episode.episodeTrackUrl && <Player trackUrl={episode.episodeTrackUrl} />}
    </div>
  );
};

export default EpisodeCard;
