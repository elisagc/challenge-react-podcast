import PodcastDetailCard from '../components/podcast/PodcastDetailCard';
import EpisodeCard from '../components/episode/EpisodeCard';
import classes from './EpisodePage.module.css';
import usePodcast from '../hooks/usePodcast';
import { useParams } from 'react-router-dom';
import Error from '../components/layout/Error';
const EpisodePage = () => {
  let { podcastId, episodeId } = useParams();

  const { podcast, podcastEpisode, errorFetching } = usePodcast(
    podcastId,
    episodeId
  );

  const isLoadedData = podcast && !!Object.keys(podcastEpisode).length;

  if (errorFetching) return <Error />;
  if (!isLoadedData) return null;

  return (
    <div className={classes['episode-page']}>
      <PodcastDetailCard podcast={podcast} />
      <EpisodeCard episode={podcastEpisode} />
    </div>
  );
};

export default EpisodePage;
