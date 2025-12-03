const BASE64_PREFIX = "data:image/jpeg;base64,";

function looksLikePureBase64Segment(segment) {
  if (!segment) return false;
  // Allow only base64 chars and padding; base64 length should be multiple of 4 but we allow remainder and rely on browser
  return /^[A-Za-z0-9+/=]+$/.test(segment);
}

export function normalizeImageSource(raw, apiBase) {
  if (!raw || typeof raw !== "string") return null;

  const source = raw.trim();
  if (!source) return null;

  const lower = source.toLowerCase();
  if (lower.startsWith("data:")) return source;

  const normalizedBase = (apiBase || "").replace(/\/$/, "");

  if (normalizedBase && lower.startsWith(normalizedBase.toLowerCase())) {
    const remainder = source.slice(normalizedBase.length);
    if (looksLikePureBase64Segment(remainder)) {
      return `${BASE64_PREFIX}${remainder}`;
    }
  }

  try {
    const parsed = new URL(source);
    const cleanPath = parsed.pathname;
    if (looksLikePureBase64Segment(cleanPath)) {
      return `${BASE64_PREFIX}${cleanPath}`;
    }
  } catch (err) {
    // not a valid absolute URL, fall through
  }

  if (lower.startsWith("http") || lower.startsWith("blob:")) return source;
  if (source.startsWith("/")) return `${apiBase}${source}`;
  return `${BASE64_PREFIX}${source}`;
}

export function normalizeEmotionScores(scores) {
  if (!scores || typeof scores !== "object") return [];

  return Object.entries(scores)
    .map(([emotion, value]) => {
      const numeric = typeof value === "number" ? value : Number(value);
      const normalized = Number.isFinite(numeric) ? (numeric > 1 ? numeric / 100 : numeric) : 0;
      const clamped = Math.max(0, Math.min(1, normalized));

      return {
        emotion,
        score: clamped,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function normalizeAnalysisItem(raw, apiBase) {
  if (!raw || typeof raw !== "object") return null;

  const emotionScores = normalizeEmotionScores(raw.emotionScores || raw.emocoes);
  const imageCandidate =
    raw.imageBase64 ||
    raw.imageUrl ||
    raw.foto ||
    raw.imagemBase64 ||
    raw.imagem?.base64 ||
    raw.base64 ||
    raw.image ||
    null;

  const foto = imageCandidate ? normalizeImageSource(imageCandidate, apiBase) : null;
  const rawTargetScore = raw.targetScore;
  const targetScore =
    typeof rawTargetScore === "number"
      ? rawTargetScore
      : rawTargetScore != null
      ? Number(rawTargetScore)
      : null;

  return {
    id: raw.id || raw._id || raw.analiseId,
    tipo: raw.tipo || raw.type || "Reconhecimento Facial",
    device: raw.device || raw.dispositivo?.nome || raw.dispositivo || raw.dispositivoNome || "Unknown device",
    foto,
    suspeito: raw.suspeito ?? raw.status ?? false,
    targetScore: Number.isFinite(targetScore) ? targetScore : null,
    dominantEmotion: raw.dominantEmotion || emotionScores[0]?.emotion || null,
    emotionScores,
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
  };
}

export function normalizeAnalysisList(list, apiBase) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => normalizeAnalysisItem(item, apiBase))
    .filter(Boolean);
}
