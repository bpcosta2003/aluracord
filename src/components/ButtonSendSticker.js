import React from "react";
import {Box, Button, Text, Image} from "@skynexui/components";
import appConfig from "../../config.json";

export function ButtonSendSticker(props) {
  //% props = URL do sticker
  const [isOpen, setOpenState] = React.useState(""); //% Verificação se o botão de sticker está aberto

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Button
        styleSheet={{
          borderRadius: "50%",
          padding: "0 0px 0 0",
          minWidth: "50px",
          minHeight: "50px",
          fontSize: "20px",
          marginRight: "10px",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255,0.35)",
          filter: isOpen ? "grayscale(0)" : "grayscale(1)",
          hover: {
            filter: "grayscale(0)",
          },
        }}
        label={isOpen ? "😁" : "😴"}
        onClick={() => setOpenState(!isOpen)} //% Caso clique no botão inverte o valor ( falso para verdadeiro e verdadeiro para falso )
      ></Button>
      {isOpen && ( //% caso esteja aberto . . .
        <Box
          className="boxBlur2"
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            width: {
              xs: "200px",
              sm: "290px",
            },
            height: "300px",
            right: "0px",
            bottom: "70px",
            padding: "20px",
            boxShadow:
              "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
          }}
          onClick={() => setOpenState(false)} //% Fica falso quando eu clico no botão quando está aberto
        >
          <Box
            tag="ul"
            styleSheet={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: "16px",
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            {appConfig.stickers.map(
              (
                sticker //% Mapeando todos os stickers e listando na tela
              ) => (
                <Text
                  onClick={() => {
                    //% console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                    if (Boolean(props.onStickerClick)) {
                      //% Caso clique no sticker vai atribuir ao argumento 'onStickerClick' a URL do sticker
                      props.onStickerClick(sticker);
                    }
                  }}
                  tag="li"
                  key={sticker}
                  styleSheet={{
                    width: "50%",
                    borderRadius: "5px",
                    padding: "10px",
                    focus: {
                      background:
                        "linear-gradient(90deg,rgba(245,245,245,0.1),rgba(245,245,245,0.1))",
                    },
                    hover: {
                      background:
                        "linear-gradient(90deg,rgba(245,245,245,0.1),rgba(245,245,245,0.1))",
                    },
                  }}
                >
                  <Image src={sticker} />
                </Text>
              )
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
