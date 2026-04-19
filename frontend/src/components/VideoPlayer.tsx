import { useEffect } from "react";
import { X } from "lucide-react";
import type { VideoItem } from "../types";
import type { TopicLink } from "../lib/factRegistry";
import { readStorage, storageKeys, writeStorage } from "../lib/storage";

type Props = {
  video: VideoItem | null;
  companionName?: string;
  showCompanionText?: boolean;
  showDescription?: boolean;
  showUnavailableHint?: boolean;
  topicLinks?: TopicLink[];
  onTopicSelect?: (link: TopicLink) => void;
  onClose: () => void;
};

export function VideoPlayer({
  video,
  companionName,
  showCompanionText = true,
  showDescription = true,
  showUnavailableHint = true,
  topicLinks,
  onTopicSelect,
  onClose,
}: Props) {
  useEffect(() => {
    if (!video) return;
    const recent = readStorage<string[]>(storageKeys.recentVideos, []);
    writeStorage(storageKeys.recentVideos, [video.id, ...recent.filter((id) => id !== video.id)].slice(0, 10));
  }, [video]);

  if (!video) return null;
  const hasYoutubeVideo = Boolean(video.youtubeVideoId);
  const hasTopics = Boolean(topicLinks?.length && onTopicSelect);

  return (
    <div className="overlay">
      <div className="video-player">
        <div className="video-player-header">
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Schließen">
            <X size={18} />
          </button>
        </div>
        {hasYoutubeVideo ? (
          <iframe
            className="video-frame"
            src={`https://www.youtube.com/embed/${video.youtubeVideoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="video-frame"
            style={{
              backgroundImage: `url(${video.previewUrl ?? video.thumbnailUrl ?? video.fallbackImageUrl ?? ""})`,
            }}
          >
            <div className="pulse-play">▶</div>
          </div>
        )}
        <div className="video-player-body">
          <h3>{video.title}</h3>
          {showDescription ? <p>{video.description}</p> : null}
          {showCompanionText && companionName ? <small>{companionName} schaut auch zu! 👀</small> : null}
          {showUnavailableHint && !hasYoutubeVideo ? (
            <p className="video-finish">Dieses Video hat keine direkte Vorschau. Tippe ein anderes Video an.</p>
          ) : null}
          {hasTopics ? (
            <div className="video-topics-panel" aria-label="Passende Themen zum Video">
              <span className="video-topics-label">Passt zum Thema:</span>
              <div className="video-topics video-topics--modal">
                {topicLinks!.map((topic) => (
                  <button
                    key={topic.factId}
                    type="button"
                    className="topic-chip"
                    onClick={() => onTopicSelect!(topic)}
                    aria-label={`${topic.label} – Mehr erfahren`}
                  >
                    <span aria-hidden>{topic.emoji}</span>
                    <span>{topic.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
