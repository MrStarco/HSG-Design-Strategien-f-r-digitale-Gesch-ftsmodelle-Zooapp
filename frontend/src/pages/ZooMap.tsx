import { lazy, Suspense, useMemo, useState } from "react";
import { MapPinned } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FactSheet } from "../components/FactSheet";
import { ZooVectorMap } from "../components/ZooVectorMap";
import { walterZooChannelHandle, videos } from "../data/animals";
import { animalCategoryFacts } from "../data/animalCategories";
import { artenschutzFacts, type Fact } from "../data/artenschutz";
import { openingHoursFact, zooEventFacts } from "../data/zooInfo";
import { getFactById, pickDemoTopicLinks, type TopicLink } from "../lib/factRegistry";
import { fetchRandomChannelVideo } from "../lib/youtube";
import type { VideoItem } from "../types";

const VideoPlayer = lazy(() => import("../components/VideoPlayer").then((m) => ({ default: m.VideoPlayer })));

function zooOpenStatus() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 9 && hour < 18) return "Jetzt geöffnet ✅ – schließt um 18:00 Uhr";
  return "Aktuell geschlossen ❌ – öffnet morgen um 9:00 Uhr";
}

export function ZooMap() {
  const navigate = useNavigate();
  const [openFact, setOpenFact] = useState<Fact | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<TopicLink[]>([]);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const mapVideos = useMemo(() => videos.slice(0, 9), []);

  const openRandomWalterZooVideo = async (video: VideoItem) => {
    setLoadingVideoId(video.id);
    setSelectedTopics(pickDemoTopicLinks(`zoomap-${video.id}`, 2));
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

  const handleTopicFromVideo = (topic: TopicLink) => {
    const fact = getFactById(topic.factId);
    if (!fact) return;
    setSelectedVideo(null);
    setOpenFact(fact);
  };

  return (
    <main className="page">
      <h2>
        <MapPinned size={22} style={{ verticalAlign: "middle", marginRight: 6 }} aria-hidden />
        Karte
      </h2>
      <section className="map-card">
        <ZooVectorMap onCompanionClick={(id) => navigate(`/profiles/${id}`)} />
      </section>

      <button
        type="button"
        className="open-status"
        onClick={() => setOpenFact(openingHoursFact)}
        aria-label={`${zooOpenStatus()} – Mehr zu Öffnungszeiten`}
      >
        <span>{zooOpenStatus()}</span>
        <span className="open-status-more" aria-hidden>Mehr ›</span>
      </button>
      <div className="events-row">
        {zooEventFacts.map((event) => (
          <button
            key={event.id}
            type="button"
            className="event-chip"
            onClick={() => setOpenFact(event)}
            aria-label={`${event.title} – Mehr erfahren`}
          >
            {event.shortLabel}
          </button>
        ))}
      </div>

      <h3>Tiere 🐾</h3>
      <div className="chips-row">
        {animalCategoryFacts.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setOpenFact(category)}
            aria-label={`${category.shortLabel} – Mehr erfahren`}
          >
            {category.shortLabel}
          </button>
        ))}
      </div>
      <h3>📺 Aktuelles aus dem Zoo</h3>
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
              className={`thumb${loadingVideoId === video.id ? " thumb--loading" : ""}`}
              style={{
                backgroundImage: `url(${video.previewUrl ?? video.thumbnailUrl ?? video.fallbackImageUrl ?? ""})`,
              }}
            >
              <span className="thumb-play">▶</span>
              <span className="thumb-duration">{loadingVideoId === video.id ? "Lädt…" : video.duration}</span>
            </div>
            <p>{video.title}</p>
          </button>
        ))}
      </div>

      <h3>🌍 Wusstest du? Artenschutz erklärt</h3>
      <div className="fact-grid">
        {artenschutzFacts.map((fact) => (
          <button
            key={fact.id}
            type="button"
            className="fact-card"
            onClick={() => setOpenFact(fact)}
            aria-label={`${fact.title} – Mehr erfahren`}
          >
            <span className="fact-card-emoji" aria-hidden>{fact.emoji}</span>
            <span className="fact-card-text">
              <strong>{fact.title}</strong>
              <small>{fact.teaser}</small>
            </span>
          </button>
        ))}
      </div>
      <FactSheet fact={openFact} onClose={() => setOpenFact(null)} />
      <section className="zoo-links">
        <h4>Noch mehr entdecken</h4>
        <p>Hier findest du mehr zum Zoo und zum Artenschutz:</p>
        <a href="https://www.walterzoo.ch" target="_blank" rel="noreferrer">
          Walter Zoo Website
        </a>
        <a href="https://www.walterzoo.ch/tiere-artenschutz" target="_blank" rel="noreferrer">
          Mehr zu Artenschutz im Walter Zoo
        </a>
      </section>

      <Suspense fallback={<div className="video-skeleton" aria-hidden />}>
        <VideoPlayer
          video={selectedVideo}
          showCompanionText={false}
          showDescription={false}
          showUnavailableHint={false}
          topicLinks={selectedTopics}
          onTopicSelect={handleTopicFromVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </Suspense>
    </main>
  );
}
