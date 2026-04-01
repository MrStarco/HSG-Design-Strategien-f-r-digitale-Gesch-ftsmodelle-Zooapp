import { useEffect } from "react";
import { X } from "lucide-react";
import type { VideoItem } from "../types";
import { readStorage, storageKeys, writeStorage } from "../lib/storage";

type Props = {
  video: VideoItem | null;
  companionName?: string;
  showCompanionText?: boolean;
  showDescription?: boolean;
  showUnavailableHint?: boolean;
  onClose: () => void;
};

export function VideoPlayer({
  video,
  companionName,
  showCompanionText = true,
  showDescription = true,
  showUnavailableHint = true,
  onClose,
}: Props) {
  useEffect(() => {
    if (!video) return;
    const recent = readStorage<string[]>(storageKeys.recentVideos, []);
    writeStorage(storageKeys.recentVideos, [video.id, ...recent.filter((id) => id !== video.id)].slice(0, 10));
  }, [video]);

  if (!video) return null;
  const hasYoutubeVideo = Boolean(video.youtubeVideoId);

  return (
    <div className="overlay">
      <div className="video-player">
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
        <h3>{video.title}</h3>
        {showDescription ? <p>{video.description}</p> : null}
        {showCompanionText && companionName ? <small>{companionName} schaut auch zu! 👀</small> : null}
        {showUnavailableHint && !hasYoutubeVideo ? (
          <p className="video-finish">Dieses Video hat keine direkte Vorschau. Tippe ein anderes Video an.</p>
        ) : null}
        <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Schließen">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
