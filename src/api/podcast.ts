import { format } from '@formkit/tempo';
import {
  Podcast,
  PodcastEpisode,
  PodcastEpisodesResponse,
  PodcastResponse,
} from '../interfaces/podcast';
import { formatTime } from '../utils/format';

const getAllPodcasts = async (): Promise<Podcast[]> => {
  const response = await fetch(
    `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
  );
  const data: PodcastResponse = await response.json();

  return data.feed.entry.map((podcast) => {
    return {
      id: podcast.id.attributes['im:id'],
      title: podcast['im:name'].label,
      artist: podcast['im:artist'].label,
      image: podcast['im:image'][2].label,
      description: podcast.summary.label,
    };
  });
};

const getPodcastEpisodesByIdWithAllOrigins = async (
  id: string
): Promise<PodcastEpisode[]> => {
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    )}`
  );

  const data = await response.json();

  const parsedData: PodcastEpisodesResponse = JSON.parse(data.contents);
  return parsedData.results
    .slice(1)
    .reverse()
    .map((episode) => ({
      title: episode.trackName,
      date: format({
        date: new Date(episode.releaseDate),
        format: 'D/M/YYYY',
      }),
      duration: episode.trackTimeMillis
        ? formatTime(episode.trackTimeMillis, true)
        : 'No available',
      episodeId: episode.trackId,
      episodeTrackUrl: episode.episodeUrl,
      episodeDescription: episode.description,
    }));
};

const getPodcastEpisodesById = async (
  id: string
): Promise<PodcastEpisode[]> => {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  );
  const data: PodcastEpisodesResponse = await response.json();

  return data.results
    .slice(1)
    .reverse()
    .map((episode) => ({
      title: episode.trackName,
      date: format({
        date: new Date(episode.releaseDate),
        format: 'D/M/YYYY',
      }),
      duration: episode.trackTimeMillis
        ? formatTime(episode.trackTimeMillis, true)
        : 'No available',
      episodeId: episode.trackId,
      episodeTrackUrl: episode.episodeUrl,
      episodeDescription: episode.description,
    }));
};
export {
  getAllPodcasts,
  getPodcastEpisodesById,
  getPodcastEpisodesByIdWithAllOrigins,
};
