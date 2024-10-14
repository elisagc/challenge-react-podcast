import { Podcast, PodcastResponse } from '../interfaces/podcast';

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

export { getAllPodcasts };
