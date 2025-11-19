import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    background: linear-gradient(46deg, #484C7B 0%, #8E1010 100%) !important;
    background-attachment: fixed;
  }
`;
