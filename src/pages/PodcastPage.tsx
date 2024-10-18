import PodcastDetailCard from '../components/podcast/PodcastDetailCard';
import EpisodeCount from '../components/episode/EpisodeCount';
import EpisodeList from '../components/episode/EpisodeList';
import classes from './PodcastPage.module.css';
import usePodcast from '../hooks/usePodcast';
import { useParams } from 'react-router-dom';
import Error from '../components/layout/Error';

const PodcastPage = () => {
  let { podcastId } = useParams();

  const { podcast, podcastEpisodes, errorFetching } = usePodcast(podcastId);
  const isLoadedData = podcast && !!podcastEpisodes.length;

  if (errorFetching) return <Error />;
  if (!isLoadedData) return null;

  return (
    <div className={classes['podcast-page']}>
      <PodcastDetailCard podcast={podcast} />
      <div className={classes['podcast-page__episodes']}>
        <EpisodeCount count={podcastEpisodes.length} />
        <EpisodeList podcast={podcast} episodes={podcastEpisodes} />
      </div>
    </div>
  );
};

export default PodcastPage;
