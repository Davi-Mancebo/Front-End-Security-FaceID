import React, { useState, useEffect } from "react";
import { AiOutlineWarning, AiOutlineCheck } from "react-icons/ai";
import {
  Page,
  Header,
  Content,
  Item,
  Row,
  Thumb,
  Ellipse,
  Info,
  Title,
  Device,
  ExpandedArea,
  Photo,
  EmptyMessage,
  BackButton,
} from "./styles";

export default function Analysis({ analises: initialAnalises, onBack }) {
  const [expandedId, setExpandedId] = useState(null);
  const [analises, setAnalises] = useState(initialAnalises || []);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

  useEffect(() => {
    console.log("Analysis page mounted - fetching from:", `${API_BASE}/analises`);
    async function load() {
      try {
        const resp = await fetch(`${API_BASE}/analises`);
        if (!resp.ok) {
          console.warn("GET /analises returned status ", resp.status);
          return;
        }

        const data = await resp.json();
        console.log("GET /analises response:", data);
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((a) => {
            console.log("Processando análise:", a);
            
            const dispositivo =
              (a.dispositivo && (a.dispositivo.nome || a.dispositivo)) ||
              a.device ||
              a.dispositivoNome ||
              "Desconhecido";

            let foto =
              a.foto ||
              a.imagemBase64 ||
              (a.imagem && (a.imagem.url || a.imagem.nome || a.imagem.path || a.imagem.base64)) ||
              a.imageUrl ||
              a.base64 ||
              null;

            console.log("Foto original:", foto);

            // Se for base64 sem o prefixo data:image, adiciona
            if (foto && typeof foto === "string" && !foto.startsWith("data:") && !foto.startsWith("http") && !foto.startsWith("/")) {
              foto = `data:image/jpeg;base64,${foto}`;
            }
            // Only prefix with API_BASE for relative paths
            else if (foto && typeof foto === "string" && !foto.startsWith("data:") && !foto.startsWith("http") && foto.startsWith("/")) {
              foto = `${API_BASE}${foto}`;
            }

            console.log("Foto final:", foto);

            return {
              id: a.id || a._id || a.analiseId,
              tipo: a.tipo || a.type || "Reconhecimento Facial",
              dispositivo,
              foto,
              suspeito:
                typeof a.suspeito !== "undefined"
                  ? a.suspeito
                  : typeof a.status !== "undefined"
                  ? a.status
                  : !!a.suspeitoAnalise || !!a.suspeitoResultado,
            };
          });

          setAnalises(normalized);
        }
      } catch (err) {
        console.warn("Erro ao buscar análises", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Page>
      <Header onClick={onBack}>← Voltar</Header>

      <Content>
        <h2>Análises</h2>

        {loading && (
          <EmptyMessage>
            Carregando<span>.</span><span>.</span><span>.</span>
          </EmptyMessage>
        )}

        {!loading && analises && analises.length === 0 && (
          <>
            <EmptyMessage>Nenhuma análise encontrada.</EmptyMessage>
            <BackButton onClick={onBack}>Voltar</BackButton>
          </>
        )}

        {!loading && analises.map((item) => (
          <Item key={item.id} onClick={() => toggle(item.id)}>
            <Row>
              <Thumb>
                {item.suspeito ? (
                  <AiOutlineWarning size={26} color="#3A3A3C" />
                ) : (
                  <Ellipse>
                    <AiOutlineCheck size={20} color="#3A3A3C" />
                  </Ellipse>
                )}
              </Thumb>

              <Info>
                <Title>{item.tipo}</Title>
                <Device>{item.dispositivo}</Device>
              </Info>
            </Row>

            {expandedId === item.id && (
              <ExpandedArea>
                <Photo src={item.foto} />
              </ExpandedArea>
            )}
          </Item>
        ))}
      </Content>
    </Page>
  );
}
