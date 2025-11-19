import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
  z-index: 998;
  display: ${({ open }) => (open ? "block" : "none")};
`;

export const Container = styled.div`
  position: fixed;
  top: 80px;
  left: ${({ open }) => (open ? "0" : "-260px")};
  width: 195px;
  height: 85%;

  background: #ffffff;
  border-radius: 0 38px 38px 0;
  transition: left 0.3s ease;
  z-index: 999;
  padding-top: 10px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 145px;
    height: 30px;

    margin-top: 10px;

    background: linear-gradient(46.97deg, #cca7a2 0%, #aa9fb1 103.69%);
    border-top-right-radius: 13px;
    border-bottom-right-radius: 13px;
    border: none;

    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
`;
