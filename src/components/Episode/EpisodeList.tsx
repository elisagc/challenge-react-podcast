import React from 'react';
import classes from './EpisodeList.module.css';
import { Link } from 'react-router-dom';
import { Podcast, PodcastEpisode } from '../../interfaces/podcast';

interface EpisodeListProps {
  episodes: PodcastEpisode[];
  podcast: Podcast;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, podcast }) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.header}>Title</th>
            <th className={classes.header}>Date</th>
            <th className={classes.header}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes?.map((episode, index) => (
            <tr key={index} className={classes.row}>
              <td className={classes.cell}>
                <Link
                  to={`/podcast/${podcast.id}/episode/${episode.episodeId}`}
                >
                  {episode.title}
                </Link>
              </td>
              <td className={classes.cell}>{episode.date}</td>
              <td className={classes.cell}>{episode.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodeList;
{
  /* <div className={classes.container}>
      <div className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              <th className={classes.tableHeaderCell}>Name</th>
              <th className={classes.tableHeaderCell}>Email</th>
              <th className={classes.tableHeaderCell}>Role</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((item) => (
              <tr key={item.episodeId} className={classes.tableRow}>
                <td className={classes.tableCell}>{item.title}</td>
                <td className={classes.tableCell}>{item.date}</td>
                <td className={classes.tableCell}>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */
}
