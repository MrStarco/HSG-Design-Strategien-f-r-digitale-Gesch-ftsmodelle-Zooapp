import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";
import { ZooVectorMap } from "../components/ZooVectorMap";
import { walterZooChannelHandle, zooCategories, zooEvents, videos } from "../data/animals";
import { fetchRandomChannelVideo } from "../lib/youtube";
import type { VideoItem } from "../types";

function zooOpenStatus() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 9 && hour < 18) return "Jetzt geöffnet ✅ – schließt um 18:00 Uhr";
  return "Aktuell geschlossen ❌ – öffnet morgen um 9:00 Uhr";
}

export function ZooMap() {
  const navigate = useNavigate();
  const [openFact, setOpenFact] = useState<number | null>(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const mapVideos = useMemo(() => videos.slice(0, 9), []);
  const facts = [
    ["Was ist Artenschutz?", "Artenschutz bedeutet, Tiere und ihre Lebensräume langfristig zu schützen."],
    ["Wie hilft ein Zoo?", "Moderne Zoos züchten bedrohte Arten und unterstützen Forschungsprojekte."],
    ["Was ist die IUCN Rote Liste?", "Die IUCN Liste zeigt, welche Arten bedroht sind und wie stark."],
    ["Was tut der Walter Zoo konkret?", "Der Zoo unterstützt Artenschutzprogramme und vermittelt Wissen in der Zooschule."],
    ["Kann ich helfen?", "Ja! Durch bewussten Konsum, Mülltrennung und Respekt gegenüber der Natur."],
  ];

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
      <h2>🗺️ Interaktive Zoo-Karte</h2>
      <section className="map-card">
        <ZooVectorMap onCompanionClick={(id) => navigate(`/profiles/${id}`)} />
      </section>

      <p className="open-status">{zooOpenStatus()}</p>
      <div className="events-row">
        {zooEvents.map((event) => (
          <article key={event}>{event}</article>
        ))}
      </div>

      <h3>Entdecke unsere Tiere 🐾</h3>
      <div className="chips-row">
        {zooCategories.map((category) => (
          <button key={category}>{category}</button>
        ))}
      </div>
      <div className="video-row">
        {mapVideos.map((video) => (
          <button
            key={video.id}
            type="button"
            className="video-card"
            aria-label={`Video abspielen: ${video.title}`}
            onClick={() => void openRandomWalterZooVideo(video)}
          >
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

      <h3>🌍 Wusstest du? Artenschutz erklärt</h3>
      <div className="facts">
        {facts.map(([title, text], index) => (
          <article key={title}>
            <button onClick={() => setOpenFact((current) => (current === index ? null : index))}>{title}</button>
            {openFact === index && <p>{text}</p>}
          </article>
        ))}
      </div>

      <VideoPlayer
        video={selectedVideo}
        showCompanionText={false}
        showDescription={false}
        showUnavailableHint={false}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
}
