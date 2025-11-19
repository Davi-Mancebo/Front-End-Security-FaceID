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
              (a.dispositivo && (a.dispositivo.nome || a.dispositivo)) ||
              a.device ||
              a.dispositivoNome ||
              "Desconhecido";

            let foto =
              a.foto ||
              (a.imagem && (a.imagem.url || a.imagem.nome || a.imagem.path || a.imagem.base64)) ||
              a.imageUrl ||
              null;

            if (foto && typeof foto === "string" && foto.startsWith("/")) {
              foto = `${API_BASE}${foto}`;
            }

            return {
              id: a.id || a._id || a.analiseId,
              tipo: a.tipo || a.type || "Reconhecimento Facial",
              dispositivo,
              foto,
              suspeito:
                typeof a.suspeito !== "undefined"
                  ? a.suspeito
                  : !!a.suspeitoAnalise || !!a.suspeitoResultado,
            };
          });

          setAnalises(normalized);
        }
      } catch (err) {
        console.warn("Erro ao buscar análises", err);
      }
    }

    load();
  }, []);

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const mock = [
    {
      id: 1,
      tipo: "Reconhecimento Facial",
      dispositivo: "iPhone 13",
      foto: "https://picsum.photos/300/200?random=1",
      suspeito: false,
    },
    {
      id: 2,
      tipo: "Análise de Acessos",
      dispositivo: "Notebook Dell",
      foto: "https://picsum.photos/300/200?random=2",
      suspeito: true,
    },
    {
      id: 3,
      tipo: "Tentativa de Login",
      dispositivo: "Samsung A52",
      foto: "https://picsum.photos/300/200?random=3",
      suspeito: true,
    },
  ];

  const data = analises?.length > 0 ? analises : mock;

  return (
    <Page>
      <Header onClick={onBack}>← Voltar</Header>

      <Content>
        <h2>Análises</h2>

        {analises && analises.length === 0 && (
          <>
            <EmptyMessage>Nenhuma análise encontrada.</EmptyMessage>
            <BackButton onClick={onBack}>Voltar</BackButton>
          </>
        )}

        {data.map((item) => (
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
