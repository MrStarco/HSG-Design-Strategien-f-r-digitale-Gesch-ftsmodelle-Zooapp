import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";
import { animalProfiles, videos, walterZooChannelHandle } from "../data/animals";
import { companions } from "../data/companions";
import { fetchRandomChannelVideo } from "../lib/youtube";
import type { VideoItem } from "../types";

export function AnimalDetail() {
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);

  const profile = useMemo(() => animalProfiles.find((item) => item.id === id) ?? null, [id]);
  if (!profile) return <Navigate to="/map" replace />;
  const companion = companions.find((c) => c.id === profile.companionId)!;
  const profileVideos = videos.filter((video) => video.animalId === profile.id);

  const openRandomWalterZooVideo = async (video: VideoItem) => {
    setLoadingVideoId(video.id);
    try {
      const randomVideo = await fetchRandomChannelVideo(walterZooChannelHandle);
      setSelectedVideo({
        ...video,
        youtubeVideoId: randomVideo.videoId,
        thumbnailUrl: randomVideo.thumbnailUrl,
      });
    } catch {
      setSelectedVideo(video);
    } finally {
      setLoadingVideoId(null);
    }
  };

  return (
    <main className="page">
      <section className="profile-header" style={{ background: companion.cardColor }}>
        <div className="profile-banner" />
        <div className="profile-companion-frame">
          <div className="profile-round profile-round-emoji" role="img" aria-label={companion.animal}>
            {companion.emoji}
          </div>
        </div>
        <h2>{profile.name}</h2>
        <p>
          {profile.species} · {profile.origin}
        </p>
        <div className="profile-stats">
          <span>{profile.age}</span>
          <span>{profile.inZooSince}</span>
          <span>{profile.enclosure}</span>
        </div>
      </section>

      <section className="bio-card">
        <p>🌟 Geschichte: {profile.story}</p>
        <p>❤️ Lieblingsaktivität: {profile.favoriteActivity}</p>
        <p>🌍 Meinen Freunden im Ausland geht es: {profile.abroadFriends}</p>
        <p>🎂 Alter: {profile.age}</p>
      </section>

      <h3>{profile.name}s Videos 🎬</h3>
      {profile.categories.map((category) => (
        <section key={category.key}>
          <h4>{category.label}</h4>
          <div className="video-row">
            {profileVideos
              .filter((video) => video.category === category.key)
              .slice(0, 3)
              .map((video) => (
                <button key={video.id} className="video-card" onClick={() => void openRandomWalterZooVideo(video)}>
                  <div
                    className="thumb"
                    style={{
                      backgroundImage: `url(${video.previewUrl ?? video.thumbnailUrl ?? video.fallbackImageUrl ?? ""})`,
                    }}
                  >
                    <span className="thumb-play">▶</span>
                    <span className="thumb-duration">{loadingVideoId === video.id ? "Lädt..." : video.duration}</span>
                  </div>
                  <p>{video.title}</p>
                </button>
              ))}
          </div>
        </section>
      ))}

      <VideoPlayer
        key={selectedVideo?.id ?? "no-video"}
        video={selectedVideo}
        companionName={companion.name}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
}
