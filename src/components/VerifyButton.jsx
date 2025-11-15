import styled from "styled-components";

const Button = styled.button`
  background: #11a011;
  padding: 14px 32px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  text-align: center;
`;

export default function VerifyButton(props) {
  return <Button {...props} />;
}
