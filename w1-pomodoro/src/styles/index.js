import { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const base = css`
  html {
    font-family: 'Roboto', sans-serif;
    height: 100%;    
  }
  #root {
    font-family: 'Roboto', sans-serif;
    overflow: auto;
    height: 100%;    
  }
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    height: 100%;    
  }
  .modebar {
      display: none !important;
  }
`
export default createGlobalStyle`  
  ${base};  
`

