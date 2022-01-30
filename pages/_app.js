import appConfig from "../config.json";
import Head from "next/head";

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
        backdrop-filter: blur(2rem);
        transition: all 0.5s;
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
        border: 0px solid transparent;
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.5);
        margin-left: 5px;
        transition: all 0.5s;
      }
      .btnLogout:hover {
        transition: all 0.5s;
        background-color: rgba(227, 81, 79, 0.1) !important;
        color: #e3514f !important;
      }
      body.swal2-shown > [aria-hidden="true"] {
        transition: 0.1s filter;
        filter: blur(5px);
      }
      .perfilLogado {
        padding: 2rem;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2rem);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
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
        font-family: "Nunito", sans-serif;
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
      <Head>
        <title>AluraCord - bybrunocosta</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/1200px-Circle-icons-chat.svg.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Fira+Sans:wght@500&family=Nunito:wght@600&family=Sora:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle /> <Component {...pageProps} />
    </>
  );
}
