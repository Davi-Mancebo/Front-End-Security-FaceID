import React from "react";
import { Container } from "./styles";

export default function Toast({ message, type, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <Container type={type}>{message}</Container>;
}
