import appConfig from "../config.json";
import {Box, Button, Text, TextField, Image} from "@skynexui/components";
import {useRouter} from "next/router";
import React from "react";

export default function PaginaChat() {
  const roteamento = useRouter();
  return (
    <>
      <Box
        as="form"
        onSubmit={(infoEvento) => {
          //% Quando submeter algo irá acontecer
          infoEvento.preventDefault(); //% Vai prevenir o carregamento da página
          roteamento.push("/"); //% vai para a página chat.js sem carregar a página
        }}
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary["050"],
          backgroundImage:
            "url(https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
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
            backgroundColor: "rgba(0,0,0,1)",
            color: "white",
          }}
        >
          CHAT
        </Box>
        <Button
          type="submit"
          label="VOLTAR"
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["100"],
            mainColor: appConfig.theme.colors.neutrals[900],
            mainColorLight: appConfig.theme.colors.primary[800],
            mainColorStrong: appConfig.theme.colors.neutrals[800],
          }}
        />
      </Box>
    </>
  );
}
