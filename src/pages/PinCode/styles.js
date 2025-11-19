import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  padding: 40px;
  border-radius: 25px;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;

export const DisplayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  gap: 10px;
`;

export const DigitBox = styled.div`
  width: 45px;
  height: 55px;
  border-radius: 10px;
  background: rgba(255,255,255,0.15);
  border: 2px solid
    ${({ color }) =>
      color === "green"
        ? "#00ff99"
        : color === "red"
        ? "#ff4444"
        : "rgba(255,255,255,0.25)"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
  font-weight: bold;
`;

export const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 75px);
  gap: 12px;
`;

export const KeyButton = styled.button`
  width: 75px;
  height: 75px;
  border-radius: 15px;
  background: rgba(255,255,255,0.08);
  border: none;
  color: white;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
`;

export const ClearButton = styled(KeyButton)`
  background: rgba(255,50,50,0.3);
`;
