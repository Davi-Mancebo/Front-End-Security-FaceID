import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Container,
  DisplayRow,
  DigitBox,
  Keyboard,
  KeyButton,
  ClearButton,
} from "./styles";

export default function PinCode() {
  const navigate = useNavigate();

  const senhaCorreta = "123456";
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("normal");
  const [isVerifying, setIsVerifying] = useState(false);

  function handleClick(num) {
    if (input.length < 6 && !isVerifying) {
      setInput((p) => p + num);
    }
  }

  function limpar() {
    setInput("");
    setStatus("normal");
    setIsVerifying(false);
  }

  function verificarSenha() {
    setIsVerifying(true);

    if (input === senhaCorreta) {
      setStatus("green");
      setTimeout(() => navigate("/admin/analysis"), 800);
    } else {
      setStatus("red");
      setTimeout(() => limpar(), 700);
    }
  }

  useEffect(() => {
    if (input.length === 6 && !isVerifying) {
      verificarSenha();
    }
  }, [input]);

  return (
    <Page>
      <Container>
        <DisplayRow>
          {[...Array(6)].map((_, i) => (
            <DigitBox key={i} color={status}>
              {input[i] || ""}
            </DigitBox>
          ))}
        </DisplayRow>

        <Keyboard>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <KeyButton key={n} onClick={() => handleClick(n.toString())}>
              {n}
            </KeyButton>
          ))}

          <ClearButton onClick={limpar}>C</ClearButton>

          <KeyButton onClick={() => handleClick("0")}>0</KeyButton>
        </Keyboard>
      </Container>
    </Page>
  );
}
