import styled from "styled-components";

const Button = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 32px;
  height: 30px;
  cursor: pointer;
  z-index: 20;

  div {
    width: 100%;
    height: 4px;
    background: white;
    margin: 4px 0;
  }
`;

export default function MenuButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <div />
      <div />
      <div />
    </Button>
  );
}
