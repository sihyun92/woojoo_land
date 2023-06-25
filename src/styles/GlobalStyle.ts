import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  * {
    box-sizing: inherit;
  }
  @font-face {
      font-family: 'GmarketSans';
      font-weight: 300;
      font-style: normal;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot');
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.eot?#iefix') format('embedded-opentype'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff2') format('woff2'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.ttf') format("truetype");
      font-display: swap;
  } 
  @font-face {
      font-family: 'GmarketSans';
      font-weight: 500;
      font-style: normal;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot');
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.eot?#iefix') format('embedded-opentype'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff2') format('woff2'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff') format('woff'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.ttf') format("truetype");
      font-display: swap;
  } 
  @font-face {
      font-family: 'GmarketSans';
      font-weight: 700;
      font-style: normal;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot');
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.eot?#iefix') format('embedded-opentype'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff2') format('woff2'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff') format('woff'),
          url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.ttf') format("truetype");
      font-display: swap;
  } 
`;

export default GlobalStyle;
