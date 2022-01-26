import appConfig from "../config.json";
import {Box, Button, Text, TextField, Image} from "@skynexui/components";
import {useRouter} from "next/router";
import React from "react";

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
  const [username, setUsername] = React.useState("");
  const roteamento = useRouter();

  return (
    <>
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
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(infoEvento) => {
              //% Quando submeter algo irá acontecer
              infoEvento.preventDefault(); //% Vai prevenir o carregamento da página
              roteamento.push("/chat"); //% vai para a página chat.js sem carregar a página
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
              width: {xs: "100%", sm: "50%"},
              textAlign: "left",
              margin: "22px",
            }}
          >
            <Titulo tag="h2">Bem vindo de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[900],
                fontSize: "14px",
              }}
            >
              Aluracord - Matrix ({username})
            </Text>

            <TextField
              type="text"
              value={username}
              onChange={(event) => {
                //% cada vez que o usuário digitar vai acontecer algo
                const value = event.target.value; //% Onde está o valor ?
                setUsername(value); //% Trocar o valor da variável
              }}
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
                mainColorStrong: appConfig.theme.colors.neutrals[800],
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
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "250px",
              padding: "10px 10px",
              background:
                "linear-gradient(90deg,rgba(245,245,245,0),rgba(245,245,245,0))",
              border: "0px solid",
              boxShadow: "0 10px 90px 0 rgb(0 0 0 / 20%)",
              borderRadius: "10%",
              flex: 1,
              minHeight: "240px",
            }}
            s
          >
            <Image
              className="boxImg"
              styleSheet={{
                borderRadius: "10%",
                marginBottom: "16px",
                boxShadow: "0 5px 5px 0 rgb(0 0 0 / 10%)",
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
