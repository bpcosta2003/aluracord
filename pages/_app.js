import appConfig from "../config.json";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      *::-webkit-scrollbar {
        width: 5px;
      }
      *::-webkit-scrollbar-track {
        background: transparent;
      }

      *::-webkit-scrollbar-thumb {
        background-color: #cccccc;
        border-radius: 100px;
        border: 0px solid orange;
      }
      .boxBlur {
        backdrop-filter: blur(16px);
        transition: all 0.5s;
      }
      .boxBlur:hover {
        backdrop-filter: blur(10px);
      }
      .boxBlur2 {
        backdrop-filter: blur(10px);
        transition: all 0.5s;
      }
      .boxBlur2:hover {
        backdrop-filter: blur(16px);
      }
      .boxImgBack .boxImg {
        transition: 0.3s;
      }
      .boxImgBack .boxImg:hover {
        transition: 0.3s;
        border-radius: 5%;
      }
      .btnLogout {
        background-color: rgba(0, 0, 0, 0) !important;
      }
      .btnLogout:hover {
        background-color: rgba(245, 245, 245, 0.5) !important;
      }
      .btnSend {
        padding: 12px 8px !important;
        background: #406e8e !important;
        width: 9rem;
        height: 45.8px;
      }
      .btnSend:hover {
        background: #335771 !important;
      }
      ::selection {
        background-color: ${appConfig.theme.colors.neutrals["200"]};
        color: rgba(0, 0, 0, 1);
      }
      body {
        font-family: "Open Sans", sans-serif;
      }

      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

export default function MyApp({Component, pageProps}) {
  //% Esse arquivo vai rodar em todas as páginas
  //% Colocar configurações globais aqui
  return (
    <>
      <GlobalStyle /> <Component {...pageProps} />
    </>
  );
}
