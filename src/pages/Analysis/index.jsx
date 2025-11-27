import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Analysis({ analises: initialAnalises }) {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [analises, setAnalises] = useState(initialAnalises || []);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch(`${API_BASE}/analises`);
        if (!resp.ok) {
          console.warn("GET /analises returned status ", resp.status);
          return;
        }

        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((a) => {
            const dispositivo =
              a.dispositivo?.nome || a.dispositivo || a.device || a.dispositivoNome || "Desconhecido";

            let foto = a.foto || a.imagemBase64 || a.imagem?.base64 || a.imagem?.url || a.imageUrl || a.base64 || null;

            // Adiciona prefixo data:image se for Base64 puro
            if (foto && typeof foto === "string" && !foto.startsWith("data:") && !foto.startsWith("http")) {
              foto = `data:image/jpeg;base64,${foto}`;
            }

            return {
              id: a.id || a._id || a.analiseId,
              tipo: a.tipo || a.type || "Reconhecimento Facial",
              dispositivo,
              foto,
              suspeito: a.suspeito ?? a.status ?? false,
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
  }, [API_BASE]);

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Page>
      <Header onClick={() => navigate("/")}>← Voltar</Header>

      <Content>
        <h2>Análises</h2>

        {loading && (
          <EmptyMessage>
            Carregando<span>.</span><span>.</span><span>.</span>
          </EmptyMessage>
        )}

        {!loading && analises && analises.length === 0 && (
          <EmptyMessage>Nenhuma análise encontrada.</EmptyMessage>
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
                {item.foto ? (
                  <>
                    <Photo 
                      src={item.foto} 
                      alt="Foto da análise"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <div style={{ display: "none", padding: "20px", textAlign: "center", color: "#f44" }}>
                      ❌ Erro ao carregar imagem
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                    📷 Imagem não disponível
                  </div>
                )}
              </ExpandedArea>
            )}
          </Item>
        ))}
      </Content>
    </Page>
  );
}
