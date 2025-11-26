import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CameraScreen from "../../components/FaceMask";
import VerifyButton from "../../components/VerifyButton";
import Toast from "../../components/Toast";
import { Page, Camera, ButtonWrapper, PreviewWrapper } from "./styles";

export default function Home() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
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
        if (resp.status >= 500) {
          throw new Error("Erro no servidor. Tente novamente mais tarde.");
        } else if (resp.status === 400) {
          throw new Error("Dados inválidos. Verifique a imagem e tente novamente.");
        } else if (resp.status === 404) {
          throw new Error("Serviço não encontrado. Verifique a configuração.");
        } else {
          const txt = await resp.text();
          throw new Error(txt || "Erro ao processar a solicitação.");
        }
      }

      const data = await resp.json();
      console.log("POST /analises/upload response:", data);
      setToast({ message: "Foto enviada com sucesso!", type: "success" });
      return data;
    } catch (err) {
      console.error(err);
      
      // Trata erros de rede específicos
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setToast({ message: "Servidor fora do ar. Verifique sua conexão.", type: "error" });
      } else {
        setToast({ message: err.message, type: "error" });
      }
      throw err;
    }
  }

  const capture = async () => {
    setLoading(true);

    const imgBase64 = webcamRef.current.getScreenshot();
    if (!imgBase64) {
      setLoading(false);
      setToast({ message: "Erro ao capturar imagem da câmera", type: "error" });
      return;
    }

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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ButtonWrapper>
        <VerifyButton onClick={capture}>
          {loading ? "Processando..." : "VERIFICAR"}
        </VerifyButton>
      </ButtonWrapper>
    </Page>
  );
}
