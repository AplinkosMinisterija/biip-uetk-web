import { buttonsTitles } from "../../utils/texts";

// Generated extracts arrive as .pdf, .zip (Geodatabase), or .geojson —
// label the button accordingly so users know what they're downloading
// before clicking. Anything else falls back to a generic "Atsisiųsti".
// Shared by FilesToDownload + FileDownloadContainer (two components
// that render the same affordance in different layouts).
const downloadLabelByExt: Record<string, string> = {
  ".pdf": buttonsTitles.downloadPdf,
  ".zip": buttonsTitles.downloadGdb,
  ".geojson": buttonsTitles.downloadGeoJson,
};

export const getPathSuffix = (raw: string) => {
  try {
    return new URL(raw).pathname.toLowerCase();
  } catch (_) {
    return raw.toLowerCase().split("?")[0];
  }
};

export const getDownloadLabel = (url: string) => {
  const path = getPathSuffix(url);
  const ext = Object.keys(downloadLabelByExt).find((e) => path.endsWith(e));
  return ext ? downloadLabelByExt[ext] : buttonsTitles.download;
};
