import {Box, Text, TextField, Image, Button} from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import {createClient} from "@supabase/supabase-js";
import {useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import {ButtonSendSticker} from "../src/components/ButtonSendSticker";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNTIxOCwiZXhwIjoxOTU4ODkxMjE4fQ.6S7Q3KQSnMjYVOUTb8EO6R6o-JF2zpmuYOQYFmDaCIs";
const SUPABASE_URL = "https://eextaluwznyskcydpabb.supabase.co";

//% Create a single supabase client for interacting with your database
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  //% Função para escutar uma nova mensagem chegando no banco de dados, passando como argumento uma função para adicionar a mensagem
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new); //% recebe a mensagem nova
    })
    .subscribe();
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const rotaUsuario = useRouter();
  const usuarioLogado = rotaUsuario.query.username; //% Recebendo as informações da página de login
  const [mensagem, setMensagem] = React.useState(""); //% armazenando a mensagem digitada
  const [listChat, setListChat] = React.useState([]); //% colocar essa mensagem em uma lista
  const [carregando, setCarregando] = React.useState(true); //% Animação de carregamento de mensagens

  React.useEffect(() => {
    //% Pegando dados do SUPABASE
    supabaseClient
      .from("mensagens") //% Pegar da tabela 'mensagens' la no SUPABASE
      .select("*") //% Selecionar todas as tabelas
      .order("id", {ascending: false}) //% Invertendo a ordem de busca, para mensagens virem na ordem certa
      .then(({data}) => {
        setListChat(data); //% Atribuindo valores do banco de dados na lista de mensagens
        setCarregando(false);
      });

    escutaMensagensEmTempoReal((novaMensagem) => {
      //% Passa função que pega a nova mensagem

      //% Se eu quero reusar um valor de referencia (objeto/array) preciso passar uma função pro setState()
      //% Eu escuto a mensagem em tempo real, sempre que tiver uma nova mensagem eu jogo na lista e vai renderizar ela na tela

      setListChat((valorAtualDaLista) => {
        return [novaMensagem, ...valorAtualDaLista];
      }); //% Os '...' servem para espalhar os itens da lista sem criar array dentro de array
    });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    //% função que recebe a mensagem digitada, adiciona essa mensagem a lista e limpa o cmpo de mensagem
    const mensagem = {
      //% criando um objeto da mensagem
      // id: listChat.length + 1, ''' Não vai precisar mais, pois o id já é cadastrado automaticamente no SUPABASE quando adiciona uma nova mensagem '''
      de: usuarioLogado,
      texto: novaMensagem,
    };

    if (novaMensagem.length < 1) {
      alert("Mensagem muito curta");
    } else {
      supabaseClient //% Inserindo novaMensagem ao banco do SUPABASE
        .from("mensagens")
        .insert([mensagem])
        .then(({data}) => {
          console.log(data);
        });

      setMensagem("");
    }
  }

  // ./Sua lógica vai aqui
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: `url(https://images.unsplash.com/photo-1642923051153-07d4c98fe203?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: "rgba(1,1,1,0.1)",
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            className="boxBlur2"
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: "rgba(1,1,1,0.5)",
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            <MessageList mensagens={listChat} carregando={carregando} />
            {/* //% Passando a lista de mensagens e carregando como propriedade */}
            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value={mensagem}
                onChange={(event) => {
                  //% Onde está o valor ?
                  const value = event.target.value;
                  //% Trocar o valor da variável
                  setMensagem(value);
                }}
                onKeyPress={(event) => {
                  //% Quando clicar no 'Enter' vai previnir o 'pular linha' e vai chamar a função de NovaMensagem
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleNovaMensagem(mensagem);
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[900],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.neutrals[300],
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                  },
                  width: "100%",
                  border: "0",
                  alignItems: "center",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              />
              {/* //% Botão sticker, passando o argumento 'onStickerClick' com a URL do sticker */}
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  handleNovaMensagem(":sticker:" + sticker); //% todo sticker começando com ':sticker:' vai ser convertido em imagem / gif e enviado para a lista de mensagens
                }}
              />
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }}
                className="btnSend"
                label="Enviar"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          margin: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading3">Chat</Text>
        <Button className="btnLogout" label="SAIR" href="/" />
      </Box>
    </>
  );
}

function MessageList(props) {
  const roteamento = useRouter(); //% fazer rota para outra página
  function removeMessage(id) {
    //% Remover mensagem pelo id

    //% 'Filter' para retirar a mensagem da array

    //% console.log(id) ta saindo o id que eu clico
    const mensagemRemovida = props.mensagens.filter(
      (mensagem) => id !== mensagem.id
    );
    //% console.log(mensagemRemovida) ta saindo o novo array com valores excluidos
    supabaseClient
      .from("mensagens")
      .delete()
      .match({id: id})
      .then(() => props.setListChat(mensagemRemovida));
  }
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.carregando && (
        <Box
          styleSheet={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box>
            <CircularProgress color="info" />
          </Box>
        </Box>
      )}

      {props.mensagens.map((mensagem) => {
        //% Fazendo a listagem da lista de mensagens
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              position: "relative",
              borderRadius: "5px",
              padding: "20px",
              marginBottom: "12px",
              hover: {
                background:
                  "linear-gradient(90deg,rgba(245,245,245,0.1),rgba(245,245,245,0.1))",
              },
            }}
          >
            <Box
              styleSheet={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row !important",
                marginBottom: "8px",
              }}
            >
              <Image
                onClick={() => {
                  roteamento.push(`https://github.com/${username}/`);
                }}
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  removeMessage(mensagem.id); //% Remover mensagem com o id selecionado
                }}
                colorVariant="neutral"
                label={<span class="material-icons">X</span>}
                styleSheet={{
                  background: "#406e8e",
                  borderRadius: "100%",
                  right: "-10px",

                  hover: {
                    backgroundColor: "#BB4430",
                  },
                }}
              />
            </Box>
            {/* //% Se for Sticker renderiza o sticker caso não, renderiza a mensagem */}
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image
                src={mensagem.texto.replace(":sticker:", "")}
                styleSheet={{
                  maxWidth: "120px",
                }}
              />
            ) : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}
