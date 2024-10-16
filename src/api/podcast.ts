import { format } from '@formkit/tempo';
import {
  Podcast,
  PodcastEpisode,
  PodcastEpisodesResponse,
  PodcastResponse,
} from '../interfaces/podcast';
import { formatTimeFromMillis } from '../utils/format';

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

const getPodcastEpisodesById = async (
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
        ? formatTimeFromMillis(episode.trackTimeMillis)
        : 'No available',
      episodeId: episode.trackId,
      episodeTrackUrl: episode.episodeUrl,
      episodeDescription: episode.description,
    }));
};

const getPodcastEpisodesById2 = async (
  id: string
): Promise<PodcastEpisode[]> => {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
  const data: PodcastEpisodesResponse = await response.json();
  console.log(data);
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
        ? formatTimeFromMillis(episode.trackTimeMillis)
        : 'No available',
      episodeId: episode.trackId,
      episodeTrackUrl: episode.episodeUrl,
      episodeDescription: episode.description,
    }));
};
export { getAllPodcasts, getPodcastEpisodesById, getPodcastEpisodesById2 };
