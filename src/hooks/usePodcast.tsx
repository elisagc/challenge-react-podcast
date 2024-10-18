import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPodcasts, getPodcastEpisodesById } from '../api/podcast';
import { Podcast, PodcastEpisode } from '../interfaces/podcast';
import { getStoredPodcasts, isDateStoredValid } from '../utils/storage';
import { useLoading } from '../context/LoadingContext';

const usePodcast = (podcastId?: string, episodeId?: string) => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [podcast, setPodcast] = useState<Podcast>({} as Podcast);
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [podcastEpisode, setPodcastEpisode] = useState<PodcastEpisode>(
    {} as PodcastEpisode
  );
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [errorFetching, setErrorFetching] = useState(false);

  const handleError = (error: any, message: string) => {
    setErrorFetching(true);
    console.error(message, error);
  };

  const loadPodcastEpisodes = useCallback(
    async (episodes: PodcastEpisode[]) => {
      if (episodeId) {
        const episode = episodes.find(
          (ep) => ep.episodeId.toString() === episodeId
        );
        episode ? setPodcastEpisode(episode) : navigate('/');
      } else {
        setPodcastEpisodes(episodes);
      }
    },
    [episodeId, navigate]
  );

  const fetchPodcastEpisodes = useCallback(async () => {
    if (!podcastId) return;

    setLoading(true);
    try {
      const episodes = await getPodcastEpisodesById(podcastId);
      await loadPodcastEpisodes(episodes);
    } catch (error) {
      handleError(error, 'Error fetching podcasts episodes:');
    } finally {
      setLoading(false);
    }
  }, [podcastId, setLoading, loadPodcastEpisodes]);

  const storePodcastsData = (data: Podcast[]) => {
    localStorage.setItem('podcastsData', JSON.stringify(data));
    localStorage.setItem('podcastsLastFetch', new Date().toString());
  };

  const loadPodcastById = useCallback(
    (podcastList: Podcast[]) => {
      const podcast = podcastList.find((p) => p.id === podcastId);
      if (!podcast) return navigate('/');
      setPodcast(podcast);
      fetchPodcastEpisodes();
    },
    [podcastId, fetchPodcastEpisodes, navigate]
  );

  const fetchAllPodcasts = useCallback(async () => {
    setLoading(true);
    try {
      const podcastsData = await getAllPodcasts();
      setPodcasts(podcastsData);
      setFilteredPodcasts(podcastsData);
      storePodcastsData(podcastsData);

      if (podcastId) loadPodcastById(podcastsData);
    } catch (error) {
      handleError(error, 'Error fetching podcasts:');
    } finally {
      setLoading(false);
    }
  }, [podcastId, setLoading, loadPodcastById]);

  useEffect(() => {
    const storedPodcasts = getStoredPodcasts();
    const isValidDate = isDateStoredValid('podcastsLastFetch');

    if (isValidDate && storedPodcasts) {
      setPodcasts(storedPodcasts);
      setFilteredPodcasts(storedPodcasts);
      if (podcastId) loadPodcastById(storedPodcasts);
    } else {
      fetchAllPodcasts();
    }
  }, [fetchAllPodcasts, podcastId, loadPodcastById]);

  const filterPodcasts = useCallback(
    (searchTerm: string) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = podcasts.filter(
        ({ artist, title }) =>
          artist.toLowerCase().includes(lowerSearchTerm) ||
          title.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredPodcasts(filtered);
    },
    [podcasts]
  );

  return {
    podcast,
    podcastEpisodes,
    podcastEpisode,
    podcasts,
    filteredPodcasts,
    errorFetching,
    filterPodcasts,
  };
};

export default usePodcast;
