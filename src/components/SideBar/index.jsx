import React from "react";
import { useNavigate } from "react-router-dom";
import { Overlay, Container } from "./styles";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  function go(path) {
    navigate(path);
    onClose();
  }

  return (
    <>
      <Overlay open={open} onClick={onClose} />

      <Container open={open}>
        <button onClick={() => go("/")}>Inicio</button>
        <button onClick={() => go("/admin/password")}>Pagina Admin</button>
      </Container>
    </>
  );
}
