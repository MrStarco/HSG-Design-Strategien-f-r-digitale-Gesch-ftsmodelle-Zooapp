import { lazy, Suspense, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FactSheet } from "../components/FactSheet";
import { SpeakButton } from "../components/SpeakButton";
import { ThreatIcons } from "../components/ThreatIcons";
import { animalProfiles, videos, walterZooChannelHandle } from "../data/animals";
import type { Fact } from "../data/artenschutz";
import { companions } from "../data/companions";
import { conservationToneClass } from "../lib/conservationTone";
import { getFactById, getThreatFact, pickDemoTopicLinks, type TopicLink } from "../lib/factRegistry";
import { fetchRandomChannelVideo } from "../lib/youtube";
import type { ThreatKind, VideoItem } from "../types";

const VideoPlayer = lazy(() => import("../components/VideoPlayer").then((m) => ({ default: m.VideoPlayer })));

export function AnimalDetail() {
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<TopicLink[]>([]);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const [openFact, setOpenFact] = useState<Fact | null>(null);

  const profile = useMemo(() => animalProfiles.find((item) => item.id === id) ?? null, [id]);
  if (!profile) return <Navigate to="/map" replace />;
  const companion = companions.find((c) => c.id === profile.companionId)!;
  const profileVideos = videos.filter((video) => video.animalId === profile.id);
  const conservationTone = conservationToneClass(profile.conservationStatus.label);

  const bioText = [
    `Geschichte: ${profile.story}`,
    `Lieblingsaktivität: ${profile.favoriteActivity}`,
    `Freunden im Ausland: ${profile.abroadFriends}`,
  ].join(". ");

  const conservationText = `Schutzstatus: ${profile.conservationStatus.label}. ${profile.conservationStatus.description}`;

  const openRandomWalterZooVideo = async (video: VideoItem) => {
    setLoadingVideoId(video.id);
    setSelectedTopics(pickDemoTopicLinks(`${profile.id}-${video.id}`, 2));
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

  const handleThreatClick = (kind: ThreatKind) => {
    setOpenFact(getThreatFact(kind));
  };

  const handleTopicFromVideo = (topic: TopicLink) => {
    const fact = getFactById(topic.factId);
    if (!fact) return;
    setSelectedVideo(null);
    setOpenFact(fact);
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
        <div className="bio-card-header">
          <SpeakButton text={bioText} label="Steckbrief vorlesen" />
        </div>
        <p>🌟 Geschichte: {profile.story}</p>
        <p>❤️ Lieblingsaktivität: {profile.favoriteActivity}</p>
        <p>🌍 Meinen Freunden im Ausland geht es: {profile.abroadFriends}</p>
        <p>🎂 Alter: {profile.age}</p>
      </section>

      <section className={`conservation-card conservation-card--${conservationTone}`}>
        <div className="conservation-card-header">
          <h3>Schutzstatus</h3>
          <SpeakButton text={conservationText} label="Schutzstatus vorlesen" />
        </div>
        <p className="conservation-label">{profile.conservationStatus.label}</p>
        <p className="conservation-desc">{profile.conservationStatus.description}</p>
        <ThreatIcons threats={profile.conservationStatus.threats} onSelect={handleThreatClick} />
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
        </section>
      ))}

      <FactSheet fact={openFact} onClose={() => setOpenFact(null)} />

      <Suspense fallback={<div className="video-skeleton" aria-hidden />}>
        <VideoPlayer
          key={selectedVideo?.id ?? "no-video"}
          video={selectedVideo}
          companionName={companion.name}
          topicLinks={selectedTopics}
          onTopicSelect={handleTopicFromVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </Suspense>
    </main>
  );
}
