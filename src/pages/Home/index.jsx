import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CameraScreen from "../../components/FaceMask";
import VerifyButton from "../../components/VerifyButton";
import { Page, Camera, ButtonWrapper, PreviewWrapper } from "./styles";

export default function Home() {
  const webcamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

  function getDeviceInfo() {
    try {
      if (navigator.userAgentData) {
        const { platform, brands, mobile } = navigator.userAgentData;
        const brandStr = (brands || []).map((b) => b.brand).join(", ");
        return `${platform || "unknown"} ${mobile ? "(mobile)" : "(desktop)"} — ${brandStr}`.trim();
      }
    } catch (e) {
      // ignore
    }

    return `${navigator.platform || "unknown"} — ${navigator.userAgent || ""}`;
  }

  async function uploadAnalysis(file, device) {
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("dispositivo", device);
      form.append("imagem", file);
      form.append("image", file);

      const resp = await fetch(`${API_BASE}/analises/upload`, {
        method: "POST",
        body: form,
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Upload falhou: ${resp.status} ${txt}`);
      }

      const data = await resp.json();
      console.log("POST /analises/upload response:", data);
      navigate("/admin/analysis");
      return data;
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar análise: " + err.message);
      throw err;
    }
  }

  const capture = async () => {
    setLoading(true);

    const imgBase64 = webcamRef.current.getScreenshot();
    if (!imgBase64) {
      setLoading(false);
      return;
    }

    setPreview(imgBase64);

    const blob = await (await fetch(imgBase64)).blob();
    const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });

    console.log({
      nome: file.name,
      tamanhoKB: (file.size / 1024).toFixed(2),
      tipo: file.type,
    });

    try {
      const device = getDeviceInfo();
      await uploadAnalysis(file, device);
    } catch (err) {
      // handled in uploadAnalysis
    }

    setLoading(false);
  };

  return (
    <Page>
      <Camera ref={webcamRef} screenshotFormat="image/jpeg" audio={false} />

      <CameraScreen />

      {preview && (
        <PreviewWrapper>
          <img src={preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </PreviewWrapper>
      )}

      <ButtonWrapper>
        <VerifyButton onClick={capture}>
          {loading ? "Processando..." : "VERIFICAR"}
        </VerifyButton>
      </ButtonWrapper>
    </Page>
  );
}
