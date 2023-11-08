import { useState } from "react";
import "./index.css";
import Api from "../../Api";
import { db } from "../../firebaseConection";
import { collection, addDoc } from "firebase/firestore";
//bootstrao
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
//mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Switch from "@mui/material/Switch";

function Home() {
  const [loading, setLoading] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Enviar");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [origem, setOrigem] = useState("CASCAVEL-PR");
  const [destino, setDestino] = useState("CASCAVEL-PR");
  const [valor, setValor] = useState("");
  const [obs, setObs] = useState("");
  const [preVisualiza, setPreVisualiza] = useState(false);
  const [enviaEmail, setEnviaEmail] = useState(true);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [auth, setAuth] = useState(true);

  const navigate = useNavigate();
  const goEnviado = () => {
    navigate("/enviados");
  };

  const formatCurrency = (value, currency, localeString) => {
    const options = { style: "currency", currency };
    setValor(value.toLocaleString(localeString, options));
  };

  //App BAR
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //PDF
  function ativaVisualizacao() {
    if (preVisualiza === false) {
      setPreVisualiza(true);
    } else {
      setPreVisualiza(false);
    }
  }
  function desativaEmail() {
    if (enviaEmail === false) {
      setEnviaEmail(true);
    } else {
      setEnviaEmail(false);
    }
  }
  function montaPDF(response) {
    const base64PDF = response.data.pdfBase64;
    if (preVisualiza) {
      var byteCharacters = atob(base64PDF);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: "application/pdf;base64" });
      var fileURL = URL.createObjectURL(file);
      //add registro banco
      window.open(fileURL);
    }
    AddEmail(base64PDF);
  }
  //--banco de dados
  async function AddEmail(base64PDF) {
    const date = new Date();
    const dia = date.getDate().toString().padStart(2, "0");
    let mes = date.getMonth() + 1;
    mes = mes.toString().padStart(2,"0");
    const ano = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const StringdataAtual = dia + "/" + mes + "/" + ano + " " + h + ":" + m;
    const dataConversao = ano+"-"+mes+"-"+dia;

    //CADASTRAR NOVO
    await addDoc(collection(db, "emailmm"), {
      nome: nome,
      doc: cpf,
      email: email,
      origem: origem,
      destino: destino,
      valor: valor,
      obs: obs,
      enviaEmail: enviaEmail,
      cb1: checked1,
      cb2: checked2,
      cb3: checked3,
      cb4: checked4,
      cb5: checked5,
      cb6: checked6,
      cb7: checked7,
      cb8: checked8,
      cb9: checked9,
      base64PDF: base64PDF,
      dataEnvio: StringdataAtual,
      dataEnvioConversao: dataConversao,
    })
      .then(() => {
        console.log("gravado no banco");
      })
      .catch((error) => {
        console.log("erro ao gravar em banco" + error);
      });
  }

  function mudaChe1() {
    if (checked1) {
      setChecked1(false);
    } else {
      setChecked1(true);
    }
  }
  function mudaChe2() {
    if (checked2) {
      setChecked2(false);
    } else {
      setChecked2(true);
    }
  }
  function mudaChe3() {
    if (checked3) {
      setChecked3(false);
    } else {
      setChecked3(true);
    }
  }
  function mudaChe4() {
    if (checked4) {
      setChecked4(false);
    } else {
      setChecked4(true);
    }
  }
  function mudaChe5() {
    if (checked5) {
      setChecked5(false);
    } else {
      setChecked5(true);
    }
  }
  function mudaChe6() {
    if (checked6) {
      setChecked6(false);
    } else {
      setChecked6(true);
    }
  }
  function mudaChe7() {
    if (checked7) {
      setChecked7(false);
    } else {
      setChecked7(true);
    }
  }
  function mudaChe8() {
    if (checked8) {
      setChecked8(false);
    } else {
      setChecked8(true);
    }
  }
  function mudaChe9() {
    if (checked9) {
      setChecked9(false);
    } else {
      setChecked9(true);
    }
  }

  function limpaCampos() {
    handleClose();
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
    setChecked5(false);
    setChecked6(false);
    setChecked7(false);
    setChecked8(false);
    setChecked9(false);
    setNome("");
    setCpf("");
    setEmail("");
    setOrigem("CASCAVEL-PR");
    setDestino("CASCAVEL-PR");
    setValor("");
    setObs("");
  }

  async function EnviarEmail() {
    if (email.length < 1) {
      toast.error("O email deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (nome.length < 1) {
      toast.error("O nome deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (origem.length < 1) {
      toast.error("A origem deve ser informada.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (destino.length < 1) {
      toast.error("O destino deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (valor.length < 1) {
      toast.error("O valor deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    setTextoBotao("Enviando E-mail");

    const data = {
      nome: nome,
      doc: cpf,
      email: email,
      origem: origem,
      destino: destino,
      valor: valor,
      obs: obs,
      enviaEmail: enviaEmail,
      cb1: checked1,
      cb2: checked2,
      cb3: checked3,
      cb4: checked4,
      cb5: checked5,
      cb6: checked6,
      cb7: checked7,
      cb8: checked8,
      cb9: checked9,
    };

    await Api.post("/send-mail", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        limpaCampos();

        montaPDF(response);

        toast.success("E-mail enviado com sucesso.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error("Erro ao enviar E-mail, verifique o E-Mail informado.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    setTextoBotao("Enviar");
    setLoading(false);
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mudanças Mazutti
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      limpaCampos();
                    }}
                  >
                    Limpar Campos
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      goEnviado();
                    }}
                  >
                    E-Mails Enviados
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Container fluid="md" className="justify-content-md-center container">
        <ToastContainer />
        <Paper elevation={0} className="paper">
          <Divider textAlign="left">Dados do Cliente</Divider>
          <br></br>
          <Form>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Nome"
                id="cliente"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="E-Mail"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <br></br>
            <Divider textAlign="left">Serviços</Divider>
            <br></br>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox1"
                    checked={checked1}
                    onClick={() => {
                      mudaChe1();
                    }}
                  />
                }
                label="CARGA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox2"
                    checked={checked2}
                    onClick={() => {
                      mudaChe2();
                    }}
                  />
                }
                label="DESCARGA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox3"
                    checked={checked3}
                    onClick={() => {
                      mudaChe3();
                    }}
                  />
                }
                label="AJUDANTES"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox4"
                    checked={checked4}
                    onClick={() => {
                      mudaChe4();
                    }}
                  />
                }
                label="MATERIAL PARA EMBALAGEM"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox5"
                    checked={checked5}
                    onClick={() => {
                      mudaChe5();
                    }}
                  />
                }
                label="EMBALAGEM DE LOUÇAS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox6"
                    checked={checked6}
                    onClick={() => {
                      mudaChe6();
                    }}
                  />
                }
                label="EMBALAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox7"
                    checked={checked7}
                    onClick={() => {
                      mudaChe7();
                    }}
                  />
                }
                label="DESMONTAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox8"
                    checked={checked8}
                    onClick={() => {
                      mudaChe8();
                    }}
                  />
                }
                label="MONTAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox9"
                    checked={checked9}
                    onClick={() => {
                      mudaChe9();
                    }}
                  />
                }
                label="SERVIÇO DE PERSONAL ORGANIZER"
              />
            </FormGroup>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Observação"
                id="obs"
                value={obs}
                onChange={(e) => setObs(e.target.value.toUpperCase())}
                helperText="Observação sobre os serviços prestados"
              />
            </Box>

            <br></br>
            <Divider textAlign="left">Localização</Divider>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Origem"
                id="origem"
                value={origem}
                onChange={(e) => setOrigem(e.target.value.toUpperCase())}
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Destino"
                id="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value.toUpperCase())}
              />
            </Box>
            <br></br>
            <Divider textAlign="left">Valor do Orçamento</Divider>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Valor"
                id="origem"
                value={valor}
                onChange={(e) => formatCurrency(e.target.value, "BRL", "pt-BR")}
              />
            </Box>
            <br></br>
            <div className="d-grid gap-2">
              <Divider textAlign="left">Configurações</Divider>
              <br></br>
              <FormControlLabel
                control={
                  <Switch
                    checked={enviaEmail}
                    onChange={() => {
                      desativaEmail();
                    }}
                    name="jason"
                    color="primary"
                  />
                }
                label="Envia E-Mail"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preVisualiza}
                    onChange={() => {
                      ativaVisualizacao();
                    }}
                    name="jason"
                    color="primary"
                  />
                }
                label="Visualiza PDF"
              />
              <Button variant="contained" onClick={EnviarEmail}>
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {textoBotao}
              </Button>
            </div>
          </Form>
        </Paper>
      </Container>
    </div>
  );
}

export default Home;
