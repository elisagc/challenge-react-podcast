import { ChangeEvent } from 'react';
import PodcastList from '../components/podcast/PodcastList';
import Search from '../components/common/Search';
import classes from './HomePage.module.css';
import usePodcast from '../hooks/usePodcast';

const HomePage = () => {
  const { filteredPodcasts, filterPodcasts } = usePodcast();

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    filterPodcasts(event.target.value);
  };

  return (
    <div className={classes['home-page']}>
      <div className={classes['search-container']}>
        <span className={classes.counter}>{filteredPodcasts.length}</span>
        <Search
          placeholder="Filter podcast..."
          onChange={handleOnChangeSearch}
        />
      </div>

      <PodcastList podcasts={filteredPodcasts} />
    </div>
  );
};

export default HomePage;
