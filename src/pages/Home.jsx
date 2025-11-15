import React, { useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import MenuButton from "../components/MenuButton";
import Sidebar from "../components/SideBar";
import CameraScreen from "../components/FaceMask";
import VerifyButton from "../components/VerifyButton";

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Camera = styled(Webcam)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const webcamRef = React.useRef(null);

  const capture = () => {
    const img = webcamRef.current.getScreenshot();
    console.log("Imagem capturada:", img);
    // enviar pro backend depois
  };

  return (
    <Page>
      <Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />

      <MenuButton onClick={() => setOpenMenu(true)} />

      <Camera
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        audio={false}
      />

      <CameraScreen />

      <ButtonWrapper>
        <VerifyButton onClick={capture}>
          VERIFICAR
        </VerifyButton>
      </ButtonWrapper>
    </Page>
  );
}
