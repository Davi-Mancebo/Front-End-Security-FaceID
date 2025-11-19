import React from "react";
import { Button } from "./styles";

export default function MenuButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <div />
      <div />
      <div />
    </Button>
  );
}
