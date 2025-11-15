import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  width: ${({ open }) => (open ? "100%" : "0")};
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.3);
  transition: 0.3s;
  overflow: hidden;
  z-index: 15;
`;

const Menu = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 65%;
  max-width: 250px;
  height: 100%;
  background: #dcdcdc;
  padding: 40px 20px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: 0.3s;
`;

export default function Sidebar({ open, onClose }) {
  return (
    <Overlay open={open} onClick={onClose}>
      <Menu open={open} onClick={(e) => e.stopPropagation()}>
        <p>VOLTAR AO LOGIN</p>
        <p>PÁGINA DE ADMIN</p>
      </Menu>
    </Overlay>
  );
}
