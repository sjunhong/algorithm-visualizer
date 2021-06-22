import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize};
  html {
    overflow-x: hidden;
  }
  
  * {
    box-sizing: border-box;
  }
  h2, h3, li, p, a, button, span {
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.05rem;
  }
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  button {
    cursor: pointer;
    outline: none;
  }
  a {
    text-decoration: none;
  }

`;

export default GlobalStyle;
