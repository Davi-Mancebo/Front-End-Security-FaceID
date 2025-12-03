import { describe, expect, it } from "vitest";
import { normalizeAnalysisItem, normalizeAnalysisList, normalizeEmotionScores } from "./analysis";

describe("normalizeEmotionScores", () => {
  it("orders entries descending and normalizes values", () => {
    const result = normalizeEmotionScores({ happy: "0.4", neutral: 0.1, sad: 0.25 });
    expect(result.map((e) => e.emotion)).toEqual(["happy", "sad", "neutral"]);
    expect(result[0].score).toBeCloseTo(0.4);
  });

  it("returns empty list for invalid payload", () => {
    expect(normalizeEmotionScores(null)).toEqual([]);
  });
});

describe("normalizeAnalysisItem", () => {
  const base = "http://localhost:8080";

  it("builds normalized structure with defaults", () => {
    const raw = {
      id: 1,
      device: "Entrada",
      status: true,
      imageBase64: "abc",
      targetScore: 0.87,
      dominantEmotion: "happy",
      emotionScores: { happy: 0.87, neutral: 0.09 },
      createdAt: "2025-12-03T14:55:50",
    };

    const result = normalizeAnalysisItem(raw, base);
    expect(result.id).toBe(1);
    expect(result.device).toBe("Entrada");
    expect(result.suspeito).toBe(true);
    expect(result.foto.startsWith("data:image/jpeg;base64,abc")).toBe(true);
    expect(result.emotionScores.length).toBe(2);
    expect(result.targetScore).toBe(0.87);
    expect(result.createdAt).toBe("2025-12-03T14:55:50");
  });

  it("falls back to defaults and ignores invalid scores", () => {
    const result = normalizeAnalysisItem({ id: 2 }, base);
    expect(result.device).toBe("Unknown device");
    expect(result.emotionScores).toEqual([]);
    expect(result.targetScore).toBeNull();
  });
});

describe("normalizeAnalysisList", () => {
  it("filters invalid entries", () => {
    const result = normalizeAnalysisList([{ id: 1, imageBase64: "abc" }, null], "");
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });
});
