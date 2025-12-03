import React, { useState, useEffect, useRef } from "react";
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
  const timeouts = useRef([]);

  // Idealmente viria de uma API segura ou variável de ambiente
  const senhaCorreta = "123456";
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("normal");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, []);

  function scheduleTimeout(callback, delay) {
    const id = setTimeout(() => {
      callback();
      timeouts.current = timeouts.current.filter((stored) => stored !== id);
    }, delay);
    timeouts.current.push(id);
  }

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
      scheduleTimeout(() => navigate("/admin/analysis"), 800);
    } else {
      setStatus("red");
      scheduleTimeout(() => limpar(), 700);
    }
  }

  useEffect(() => {
    if (input.length === 6 && !isVerifying) {
      verificarSenha();
    }
  }, [input, isVerifying]);

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
