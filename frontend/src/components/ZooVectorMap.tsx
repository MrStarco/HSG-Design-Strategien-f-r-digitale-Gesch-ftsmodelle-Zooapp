import { useRef, useState, type PointerEvent, type WheelEvent } from "react";
import { companions } from "../data/companions";
import { companionAnchors, infrastructurePoints, mapPaths, mapViewBox, mapZones } from "../data/zooMapLayout";

type Props = {
  onCompanionClick: (id: string) => void;
};

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 3;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function parseViewBox(viewBox: string) {
  const [x, y, width, height] = viewBox.split(" ").map(Number);
  return { x, y, width, height };
}

export function ZooVectorMap({ onCompanionClick }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const dragRef = useRef<
    null | { pointerId: number; startX: number; startY: number; startClientX: number; startClientY: number; panStartX: number; panStartY: number }
  >(null);
  const pinchRef = useRef<null | { startDistance: number; startZoom: number; worldCenterX: number; worldCenterY: number }>(null);
  const movedRef = useRef(false);
  const [{ zoom, panX, panY }, setViewport] = useState({ zoom: 1, panX: 0, panY: 0 });
  const [dragging, setDragging] = useState(false);

  const baseViewBox = parseViewBox(mapViewBox);

  const getSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    return point.matrixTransform(matrix.inverse());
  };

  const applyZoomAt = (nextZoom: number, centerX: number, centerY: number) => {
    setViewport((current) => {
      const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
      if (clampedZoom === current.zoom) return current;
      const worldX = (centerX - current.panX) / current.zoom;
      const worldY = (centerY - current.panY) / current.zoom;
      const nextPanX = centerX - worldX * clampedZoom;
      const nextPanY = centerY - worldY * clampedZoom;
      movedRef.current = true;
      return { zoom: clampedZoom, panX: nextPanX, panY: nextPanY };
    });
  };

  const zoomFromCenter = (factor: number) => {
    const centerX = baseViewBox.x + baseViewBox.width / 2;
    const centerY = baseViewBox.y + baseViewBox.height / 2;
    applyZoomAt(zoom * factor, centerX, centerY);
  };

  const resetViewport = () => {
    setViewport({ zoom: 1, panX: 0, panY: 0 });
    movedRef.current = false;
  };

  const getTappedCompanionId = (x: number, y: number) => {
    for (const anchor of companionAnchors) {
      const renderedX = anchor.x * zoom + panX;
      const renderedY = anchor.y * zoom + panY;
      const distance = Math.hypot(x - renderedX, y - renderedY);
      if (distance <= Math.max(18, 24 * zoom)) return anchor.id;
    }
    return null;
  };

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    const point = getSvgPoint(event.clientX, event.clientY);
    if (!point) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: point.x, y: point.y });
    if (pointersRef.current.size === 1) {
      dragRef.current = {
        pointerId: event.pointerId,
        startX: point.x,
        startY: point.y,
        startClientX: event.clientX,
        startClientY: event.clientY,
        panStartX: panX,
        panStartY: panY,
      };
      movedRef.current = false;
      setDragging(true);
      return;
    }
    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      const centerX = (a.x + b.x) / 2;
      const centerY = (a.y + b.y) / 2;
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      pinchRef.current = {
        startDistance: Math.max(distance, 1),
        startZoom: zoom,
        worldCenterX: (centerX - panX) / zoom,
        worldCenterY: (centerY - panY) / zoom,
      };
      dragRef.current = null;
      setDragging(false);
    }
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const point = getSvgPoint(event.clientX, event.clientY);
    if (!point) return;
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: point.x, y: point.y });

    if (pinchRef.current && pointersRef.current.size >= 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      const centerX = (a.x + b.x) / 2;
      const centerY = (a.y + b.y) / 2;
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = distance / pinchRef.current.startDistance;
      const nextZoom = clamp(pinchRef.current.startZoom * ratio, MIN_ZOOM, MAX_ZOOM);
      const nextPanX = centerX - pinchRef.current.worldCenterX * nextZoom;
      const nextPanY = centerY - pinchRef.current.worldCenterY * nextZoom;
      setViewport({ zoom: nextZoom, panX: nextPanX, panY: nextPanY });
      movedRef.current = true;
      return;
    }

    if (dragRef.current?.pointerId === event.pointerId) {
      const dx = point.x - dragRef.current.startX;
      const dy = point.y - dragRef.current.startY;
      const movedClientX = Math.abs(event.clientX - dragRef.current.startClientX);
      const movedClientY = Math.abs(event.clientY - dragRef.current.startClientY);
      if (movedClientX > 8 || movedClientY > 8) movedRef.current = true;
      setViewport((current) => ({
        ...current,
        panX: dragRef.current ? dragRef.current.panStartX + dx : current.panX,
        panY: dragRef.current ? dragRef.current.panStartY + dy : current.panY,
      }));
    }
  };

  const onPointerUp = (event: PointerEvent<SVGSVGElement>) => {
    const point = getSvgPoint(event.clientX, event.clientY);
    const dragState = dragRef.current;
    const isTap =
      !!dragState &&
      dragState.pointerId === event.pointerId &&
      !movedRef.current &&
      pointersRef.current.size === 1 &&
      !!point;

    if (isTap && point) {
      const companionId = getTappedCompanionId(point.x, point.y);
      if (companionId) {
        onCompanionClick(companionId);
      }
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      setDragging(false);
      movedRef.current = false;
    }
  };

  const onWheel = (event: WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const point = getSvgPoint(event.clientX, event.clientY);
    if (!point) return;
    const factor = Math.exp(-event.deltaY * 0.0014);
    applyZoomAt(zoom * factor, point.x, point.y);
  };

  return (
    <div className="zoo-map-vector-wrap">
      <svg
        ref={svgRef}
        viewBox={mapViewBox}
        className={`zoo-map-vector${dragging ? " is-dragging" : ""}`}
        role="img"
        aria-label="Walter Zoo Karte"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <rect x={baseViewBox.x} y={baseViewBox.y} width={baseViewBox.width} height={baseViewBox.height} className="map-bg" />
        <g transform={`translate(${panX} ${panY}) scale(${zoom})`}>
          <g className="map-zones">
            {mapZones.map((zone) => (
              <g key={zone.id}>
                <path d={zone.d} className="map-zone-shape" />
                <text className="map-zone-label" x={zone.labelX} y={zone.labelY} textAnchor="middle">
                  {zone.label}
                </text>
              </g>
            ))}
          </g>

          <g className="map-paths">
            {mapPaths.map((path) => (
              <path key={path.id} d={path.d} className={path.kind === "main" ? "map-path-main" : "map-path-side"} />
            ))}
          </g>

          <g className="map-infra">
            {infrastructurePoints.map((point) => (
              <g key={point.id} transform={`translate(${point.x}, ${point.y})`}>
                <circle r="14" className="map-infra-dot" />
                <text className="map-infra-icon" textAnchor="middle" dominantBaseline="central">
                  {point.icon}
                </text>
              </g>
            ))}
          </g>

          <g className="map-companions">
            {companionAnchors.map((anchor) => {
              const companion = companions.find((item) => item.id === anchor.id);
              if (!companion) return null;
              return (
                <g
                  key={anchor.id}
                  transform={`translate(${anchor.x}, ${anchor.y})`}
                  className="map-companion-node"
                >
                  <circle r="20" fill={companion.cardColor} className="map-companion-ring" />
                  <text className="map-companion-emoji" textAnchor="middle" dominantBaseline="central" aria-hidden="true">
                    {companion.emoji}
                  </text>
                  <text className="map-companion-name" textAnchor="middle" y="32">
                    {companion.name}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
      <div className="map-zoom-controls" aria-label="Karten-Zoom">
        <button type="button" onClick={() => zoomFromCenter(1.2)} aria-label="Hineinzoomen">
          +
        </button>
        <button type="button" onClick={() => zoomFromCenter(1 / 1.2)} aria-label="Herauszoomen">
          -
        </button>
        <button type="button" onClick={resetViewport} aria-label="Ansicht zurücksetzen">
          Reset
        </button>
      </div>
    </div>
  );
}
