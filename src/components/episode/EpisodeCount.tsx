import React from 'react';
import styles from './EpisodeCount.module.css';

interface EpisodeCountProps {
  count: number;
}

const EpisodeCount: React.FC<EpisodeCountProps> = ({ count }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Episodes: {count}</h2>
    </div>
  );
};

export default EpisodeCount;
