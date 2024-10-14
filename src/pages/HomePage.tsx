import React, { useEffect } from 'react';
import { getAllPodcasts } from '../api/podcast';
import { Podcast } from '../interfaces/podcast';
import PodcastList from '../components/PodcastList';

const HomePage = () => {
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([]);
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setPodcasts(await getAllPodcasts());
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div>
      <div>Buscador</div>
      <PodcastList podcasts={podcasts} />
    </div>
  );
};

export default HomePage;
