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
      .boxBlur {
        backdrop-filter: blur(16px);
        transition: all 0.5s;
      }
      .boxBlur:hover {
        backdrop-filter: blur(10px);
      }
      .boxImgBack .boxImg {
        transition: 0.3s;
      }
      .boxImgBack .boxImg:hover {
        transition: 0.3s;
        border-radius: 100%;
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
