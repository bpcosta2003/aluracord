import {Box, Text, TextField, Image, Button} from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import {createClient} from "@supabase/supabase-js";
import {useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import {ButtonSendSticker} from "../src/components/ButtonSendSticker";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";

//% Chat

function ChatPage({SUPABASE_ANON_KEY, SUPABASE_URL}) {
  //% Roteamento

  const rotaUsuario = useRouter();

  //% Recebendo as informações da página de login

  const usuarioLogado = rotaUsuario.query.username.toLowerCase();

  //% armazenando a mensagem digitada

  const [mensagem, setMensagem] = React.useState("");

  //% colocar essa mensagem em uma lista

  const [listChat, setListChat] = React.useState([]);

  //% Animação de carregamento de mensagens

  const [carregando, setCarregando] = React.useState(true);

  // Lista para deletar mensagens :

  // const [deleting, setDeleting] = React.useState([]);

  //% Supabase CLIENT

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // function escutaMensagensEmTempoReal(adicionaMensagem) {
  //   return supabaseClient
  //     .from("mensagens")
  //     .on("INSERT", (respostaLive) => {
  //       adicionaMensagem(respostaLive.new);
  //     })
  //     .on("DELETE", (respostaLive) => {
  //       adicionaMensagem(respostaLive.old.id);
  //     })
  //     .subscribe();
  // }

  //% Função para escutar uma nova mensagem chegando no banco de dados, passando como argumento uma função para adicionar a mensagem

  function escutaMensagensEmTempoReal(attMensagens) {
    //% Pegando dados do SUPABASE
    supabaseClient
      .from("mensagens")
      .on("INSERT", attMensagens)
      .on("DELETE", attMensagens)
      .subscribe();
  }

  function attMensagens() {
    //% Pegando dados do SUPABASE
    supabaseClient
      .from("mensagens") //% Pegar da tabela 'mensagens' la no SUPABASE
      .select("*") //% Selecionar todas as tabelas
      .order("id", {ascending: false}) //% Ordena ID em ordem crescente
      .then(({data}) => {
        setListChat(data); //% Atribuindo valores do banco de dados na lista de mensagens
        setCarregando(false);
      });
  }

  //% Hook do React para alteração APENAS quando ocorrer um efeito

  React.useEffect(() => {
    attMensagens();
    //% Passa função que pega a nova mensagem
    escutaMensagensEmTempoReal(attMensagens);
  }, []);

  // React.useEffect(() => {

  //   supabaseClient
  //     .from("mensagens")
  //     .select("*")
  //     .order("id", {ascending: false})
  //     .then(({data}) => {
  //       setListChat(data);
  //       setCarregando(false);
  //     });

  //

  //   escutaMensagensEmTempoReal((novaMensagem) => {
  //     setListChat((valorAtualDaLista) => {
  //       return [novaMensagem, ...valorAtualDaLista];
  //     });
  //   });
  // }, []);

  // function handleDeleteMensagem(id) {

  //  , isolando-o e criando um novo array

  //   setDeleting((valorAtual) => {
  //     return [...valorAtual, id];
  //   });

  //   supabaseClient
  //     .from("mensagens")
  //     .delete()
  //     .match({id: id})
  //     .then(() => {
  //       setDeleting((valorAtual) => {
  //         return valorAtual.filter((value) => {
  //           return value !== id;
  //         });
  //       });
  //       setListChat(
  //         listChat.filter((element) => {
  //           return element.id !== id;
  //         })
  //       );
  //     });
  // }

  //% Remover mensagem pelo ID
  function handleDeleteMensagem(id) {
    supabaseClient
      .from("mensagens")
      .delete()
      .match({id: id})
      .then(() => {
        setListChat(
          listChat.filter((element) => {
            //% Filtra pelo ID, selecionando o elemento
            return element.id !== id;
          })
        );
      });
  }

  function handleNovaMensagem(novaMensagem) {
    //% função que recebe a mensagem digitada, adiciona essa mensagem a lista e limpa o cmpo de mensagem
    const mensagem = {
      //% criando um objeto da mensagem
      // id: listChat.length + 1, ''' Não vai precisar mais, pois o id já é cadastrado automaticamente no SUPABASE quando adiciona uma nova mensagem '''
      de: usuarioLogado,
      texto: novaMensagem,
    };

    if (novaMensagem.length < 1) {
      Swal.fire({
        title: "Mensagem muito curta!",
        text: "Essa mensagem é muito curta para ser enviada.",
        icon: "warning",
        color: "white",
        background: "rgba(227, 81, 79, 0.8)",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        button: false,
        footer: "<a></a>",
      });
    } else {
      supabaseClient //% Inserindo novaMensagem ao banco do SUPABASE
        .from("mensagens")
        .insert([mensagem])
        .then(({data}) => {
          setListChat([data[0], ...listChat]);
        });

      setMensagem("");
    }
  }

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(1, 1, 1,0.5)",
          backgroundImage: `url(https://images.unsplash.com/photo-1458432449677-469b01f8ed08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            borderRadius: {
              xs: "0px",
              sm: "10px",
              md: "10px",
              lg: "10px",
              xl: "10px",
            },
            backgroundColor: "rgba(1,1,1,0)",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100vh",
            padding: {
              xs: "0px",
              sm: "20px",
              md: "25px",
              lg: "32px",
              xl: "60px",
            },
          }}
        >
          <Header usuarioLogado={usuarioLogado} carregando={carregando} />
          <Box
            className="boxBlur2"
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: "rgba(1,1,1,0.5)",
              flexDirection: "column",
              padding: "16px",
              borderRadius: {
                xs: "0px",
                sm: "10px",
                md: "10px",
                lg: "10px",
                xl: "10px",
              },
            }}
          >
            <MessageList
              mensagens={listChat}
              carregando={carregando}
              setListChat={setListChat}
              username={usuarioLogado}
              onDelete={handleDeleteMensagem}
            />
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
                disabled={!mensagem}
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

//% Conexão com o SUPABASE

function Header(props) {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {props.carregando ? (
          <Box>
            <CircularProgress color="info" size="20px" />
          </Box>
        ) : (
          <Box
            className="perfilLogado"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              boxShadow: "5px 5px 25px rgba(0, 0, 0, 1)",
              borderRadius: {
                xs: "0px",
                sm: "10px",
                md: "10px",
                lg: "10px",
                xl: "10px",
              },
            }}
          >
            <Box
              styleSheet={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                  transition: "ease .2s",
                  hover: {
                    width: "36px",
                    height: "36px",
                  },
                }}
                src={`https://github.com/${props.usuarioLogado}.png`}
              />
              <Text
                styleSheet={{
                  color: "#87D039",
                  fontWeight: "bold",
                }}
              >
                {props.usuarioLogado}
              </Text>
            </Box>
            <Button
              className="btnLogout"
              label="Logout"
              iconName="arrowLeft"
              href="/"
            />
          </Box>
        )}
      </Box>
    </>
  );
}

function MessageList(props) {
  const roteamento = useRouter(); //% fazer rota para outra página

  function generateDate(string) {
    //% formatar data
    var time = new Date(string).toLocaleTimeString().substring(0, 5);
    var date;
    switch (new Date().getDate() - new Date(string).getDate()) {
      case 0:
        date = "Hoje";
        break;
      case 1:
        date = "Ontem";
        break;
      case 2:
        date = "Anteontem";
        break;
      default:
        time = time;
        date = new Date(string).toLocaleDateString();
    }
    return `${date} ${time}`;
  }

  return (
    <Box
      className="boxMsg"
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
            className="textNick"
            key={mensagem.id}
            tag="li"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems:
                mensagem.de.toLowerCase() == props.username.toLowerCase()
                  ? "flex-end"
                  : "flex-start",
              position: "relative",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "12px",
              backgroundColor: "rgba(1,1,1,0.3)",
              background:
                mensagem.de.toLowerCase() == props.username.toLowerCase()
                  ? "linear-gradient( 270deg, rgba(115, 182, 43, 0.2), rgba(0, 0, 0, 0.5))"
                  : "rgba(1,1,1,0.3)",

              hover: {
                background:
                  mensagem.de.toLowerCase() == props.username.toLowerCase()
                    ? "linear-gradient( 270deg, rgba(115, 182, 43, 0.2), rgba(245,245,245,0.1))"
                    : "linear-gradient( 270deg, rgba(245,245,245,0.1), rgba(245,245,245,0.1))",
              },
            }}
          >
            <Box
              className="nickAnimation"
              styleSheet={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row !important",
                marginBottom: "8px",
              }}
            >
              <Image
                className="imgNick"
                onClick={() => {
                  roteamento.push(
                    `https://github.com/${mensagem.de.toLowerCase()}/`
                  );
                }}
                styleSheet={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                  transition: "all 0.5s",
                  hover: {
                    transform: "scale(2)",
                    margin: "10px 40px 20px 10px",
                    transition: "all 0.5s",
                    cursor: "pointer",
                  },
                }}
                src={`https://github.com/${mensagem.de.toLowerCase()}.png`}
              />
              <Text
                tag="strong"
                styleSheet={{
                  color:
                    mensagem.de.toLowerCase() == props.username.toLowerCase()
                      ? "#87D039"
                      : "#E0E2DB",
                  fontWeight: "bold",
                }}
              >
                {mensagem.de.toLowerCase()}
              </Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              ></Text>
              {mensagem.de.toLowerCase() == props.username.toLowerCase() ? (
                <Button
                  onClick={(event) => {
                    event.preventDefault();

                    props.onDelete(mensagem.id); //% Remover mensagem com o id selecionado
                  }}
                  colorVariant="neutral"
                  label="X"
                  styleSheet={{
                    background: "#BB4430",
                    borderRadius: "100%",
                    right: "-10px",

                    hover: {
                      backgroundColor: "#923626",
                    },
                  }}
                />
              ) : (
                ""
              )}
            </Box>
            {/* //% Se for Sticker renderiza o sticker caso não, renderiza a mensagem */}
            {mensagem.texto.startsWith(":sticker:") ? (
              <>
                <Image
                  src={mensagem.texto.replace(":sticker:", "")}
                  styleSheet={{
                    maxWidth: "150px",
                    marginTop: "10px",
                  }}
                />
                <Text
                  styleSheet={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "20px",
                  }}
                >
                  {generateDate(mensagem.created_at)}
                </Text>
              </>
            ) : (
              <>
                <Text
                  styleSheet={{
                    marginTop: "10px",
                  }}
                >
                  {mensagem.texto}
                </Text>
                <Text
                  styleSheet={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "15px",
                  }}
                >
                  {generateDate(mensagem.created_at)}
                </Text>
              </>
            )}
          </Text>
        );
      })}
    </Box>
  );
}

export async function getServerSideProps() {
  const {SUPABASE_ANON_KEY, SUPABASE_URL} = process.env;
  return {
    props: {
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    },
  };
}

export default ChatPage;
