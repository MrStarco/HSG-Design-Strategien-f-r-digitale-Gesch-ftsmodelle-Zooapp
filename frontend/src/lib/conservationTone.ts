/** Farbe für Schutzstatus-Badge aus dem Label ableiten (ohne IUCN-Codes). */
export function conservationToneClass(label: string): "safe" | "warn" | "danger" {
  const l = label.toLowerCase();
  if (l.includes("stark gefährdet") || l.includes("kritisch")) return "danger";
  if (l.includes("nicht stark") || l.includes("bestand erholt") || l.includes("erholt sich") || l.includes("stabil")) return "safe";
  if (l.includes("nicht") && (l.includes("gefährdet") || l.includes("bedroht"))) return "safe";
  if (l.includes("gefährdet") || l.includes("bedroht")) return "warn";
  return "warn";
}
