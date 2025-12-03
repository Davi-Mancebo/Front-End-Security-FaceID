import React, { useState, useRef } from "react";
import CameraScreen from "../../components/FaceMask";
import VerifyButton from "../../components/VerifyButton";
import Toast from "../../components/Toast";
import { Page, Camera, ButtonWrapper } from "./styles";

export default function Home() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

  // Comprime a imagem para reduzir tamanho do upload
  function compressImage(base64Image, maxWidth = 1200, maxHeight = 900, quality = 0.92) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Calcula novo tamanho mantendo proporção
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Exporta com qualidade reduzida
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Falha ao carregar imagem para compressão"));
      img.src = base64Image;
    });
  }

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
      form.append("device", device);
      form.append("image", file);

      const resp = await fetch(`${API_BASE}/analyses/upload`, {
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

    if (!webcamRef.current) {
      setLoading(false);
      setToast({ message: "Câmera não inicializada", type: "error" });
      return;
    }

    const imgBase64 = webcamRef.current.getScreenshot();
    if (!imgBase64) {
      setLoading(false);
      setToast({ message: "Erro ao capturar imagem da câmera", type: "error" });
      return;
    }

    // Comprime a imagem antes de enviar
    let file;
    try {
      const compressedBase64 = await compressImage(imgBase64);
      const blob = await (await fetch(compressedBase64)).blob();
      file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Erro ao comprimir a imagem", type: "error" });
      setLoading(false);
      return;
    }

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
