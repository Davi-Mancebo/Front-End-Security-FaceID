import styled from "styled-components";
import Webcam from "react-webcam";

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const Camera = styled(Webcam)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PreviewWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 120px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0,0,0,0.3);
`;
