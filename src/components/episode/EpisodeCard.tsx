import { PodcastEpisode } from '../../interfaces/podcast';
import Player from '../common/Player';
import classes from './EpisodeCard.module.css';
import DOMPurify from 'dompurify';
interface Props {
  episode: PodcastEpisode;
}

const EpisodeCard = ({ episode }: Props) => {
  const sanitizedDescription = DOMPurify.sanitize(
    episode.episodeDescription ?? ''
  );
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{episode.title}</h2>
      <div
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />

      {episode.episodeTrackUrl && <Player trackUrl={episode.episodeTrackUrl} />}
    </div>
  );
};

export default EpisodeCard;
