import styled from "styled-components";

export const Mask = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  background: linear-gradient(46deg, #484C7B 0%, #8E1010 100%);

  /* Buraco oval no centro da tela, responsivo */
  -webkit-mask: radial-gradient(
    ellipse 40% 28% at 50% 35%,
    transparent 0%,
    transparent 55%,
    black 70%
  );

  mask: radial-gradient(
    ellipse 40% 28% at 50% 40%,
    transparent 100%,
    black 70%
  );
`;
