export type RandomYoutubeVideo = {
  handle: string;
  videoId: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
};

export async function fetchRandomChannelVideo(handle: string) {
  const response = await fetch(`/api/youtube/random?handle=${encodeURIComponent(handle)}`);
  if (!response.ok) {
    throw new Error("Zufallsvideo konnte nicht geladen werden.");
  }
  return (await response.json()) as RandomYoutubeVideo;
}
