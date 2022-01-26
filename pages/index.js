import appConfig from "../config.json";
import {Box, Button, Text, TextField, Image} from "@skynexui/components";

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
        background-color: ${appConfig.theme.colors.neutrals["100"]};
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

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <div>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["900"]};
          padding: 1.5rem 0rem;
          text-align: left;
          font-size: 22px;
          margin: 0;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

export default function PaginaInicial() {
  const username = "bpcosta2003";

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary["050"],
          backgroundImage:
            "url(https://images.unsplash.com/photo-1642923051153-07d4c98fe203?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          className="boxBlur"
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "1000px",
            borderRadius: "10px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 20px 20px 0 rgb(0 0 0 / 20%)",
            backgroundColor: "rgba(225,225,225,0.5)",
            backgroundFilter: "30px",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: {xs: "100%", sm: "50%"},
              textAlign: "left",
              margin: "22px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[900],
                fontSize: "14px",
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.neutrals[300],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
            />
            <Button
              type="submit"
              label="ENTRAR"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["100"],
                mainColor: appConfig.theme.colors.neutrals[900],
                mainColorLight: appConfig.theme.colors.primary[800],
                mainColorStrong: appConfig.theme.colors.neutrals[500],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            className="boxImgBack"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "250px",
              padding: "10px 10px",
              backgroundColor: "#000000",
              border: "1px solid",
              borderColor: "none",
              borderRadius: "5%",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              className="boxImg"
              styleSheet={{
                borderRadius: "5%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
