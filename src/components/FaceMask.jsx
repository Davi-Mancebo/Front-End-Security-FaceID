import styled from "styled-components";

const Mask = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.7);

  /* Máscara para "recortar" o centro */
  -webkit-mask: radial-gradient(
    circle at center,
    transparent 150px,
    black 160px
  );
-webkit-mask: radial-gradient(
  ellipse 100px 150px at center,
  transparent 100%,
  black 100%
);
`;

export default function FaceMask() {
  return <Mask />;
}
