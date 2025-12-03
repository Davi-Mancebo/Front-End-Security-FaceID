import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineWarning, AiOutlineCheck } from "react-icons/ai";
import { normalizeAnalysisList, normalizeImageSource } from "../../utils/analysis";
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
  Details,
  DetailRow,
  DetailLabel,
  DetailValue,
  EmotionList,
  EmotionItem,
  EmotionHeader,
  EmotionName,
  EmotionScore,
  EmotionBar,
  EmotionBarFill,
  EmptyMessage,
} from "./styles";

export default function Analysis({ analises: initialAnalises }) {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const [expandedId, setExpandedId] = useState(null);
  const [analises, setAnalises] = useState(() => normalizeAnalysisList(initialAnalises || [], API_BASE));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAnalises(normalizeAnalysisList(initialAnalises || [], API_BASE));
  }, [initialAnalises, API_BASE]);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch(`${API_BASE}/analyses`);
        if (!resp.ok) {
          console.warn("GET /analyses returned status ", resp.status);
          setError("Falha ao carregar análises. Tente novamente mais tarde.");
          setAnalises([]);
          return;
        }

        const data = await resp.json();
        const normalized = normalizeAnalysisList(data, API_BASE);
        setAnalises(normalized);
        setError(null);
      } catch (err) {
        console.warn("Erro ao buscar análises", err);
        setAnalises([]);
        setError("Não foi possível carregar as análises.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [API_BASE]);

  const toggle = useCallback(
    (id) => {
      setExpandedId((current) => (current === id ? null : id));
    },
    []
  );

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

        {!loading && error && (
          <EmptyMessage>{error}</EmptyMessage>
        )}

        {!loading && !error && analises && analises.length === 0 && (
          <EmptyMessage>Nenhuma análise encontrada.</EmptyMessage>
        )}

        {!loading && !error && (
          analises.map((item) => {
            const photoSrc = item.foto ? normalizeImageSource(item.foto, API_BASE) : null;

            return (
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
                    <Device>{item.device || "Unknown device"}</Device>
                  </Info>
                </Row>

                {expandedId === item.id && (
                  <ExpandedArea>
                    {photoSrc ? (
                      <>
                        <Photo
                          src={photoSrc}
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

                    <Details>
                      <DetailRow>
                        <DetailLabel>Emoção dominante</DetailLabel>
                        <DetailValue>{item.dominantEmotion || "—"}</DetailValue>
                      </DetailRow>
                      <DetailRow>
                        <DetailLabel>Status</DetailLabel>
                        <DetailValue $suspect={item.suspeito}>{item.suspeito ? "Suspeito" : "Aprovado"}</DetailValue>
                      </DetailRow>
                    </Details>

                    {item.emotionScores?.length > 0 && (
                      <EmotionList>
                        {item.emotionScores.map(({ emotion, score }) => (
                          <EmotionItem key={emotion}>
                            <EmotionHeader>
                              <EmotionName>{emotion}</EmotionName>
                              <EmotionScore>{`${Math.round((score || 0) * 100)}%`}</EmotionScore>
                            </EmotionHeader>
                            <EmotionBar>
                              <EmotionBarFill style={{ width: `${Math.min(100, Math.max(0, Math.round((score || 0) * 100)))}%` }} />
                            </EmotionBar>
                          </EmotionItem>
                        ))}
                      </EmotionList>
                    )}
                  </ExpandedArea>
                )}
              </Item>
            );
          })
        )}
      </Content>
    </Page>
  );
}
