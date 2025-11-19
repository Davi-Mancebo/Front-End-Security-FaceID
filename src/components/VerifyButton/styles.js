import styled from "styled-components";

export const Button = styled.button`
  margin-top: 20px;
  padding: 14px 40px;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background: #7d62ff;
  cursor: pointer;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);

  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: #6c54e0;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
