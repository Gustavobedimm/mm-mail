import { useState, useEffect } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//import { Buffer } from 'buffer';

function Home() {
  const [loading, setLoading] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Enviar");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [valor, setValor] = useState("");
  const [obs, setObs] = useState("");
  const [preVisualiza, setPreVisualiza] = useState(false);
  const [enviaEmail, setEnviaEmail] = useState(true);

  const [auth, setAuth] = useState(true);

  const [empresaNome, setEmpresaNome] = useState();
  const [empresaCelular, setEmpresaCelular] = useState();
  const [empresaTelefone, setEmpresaTelefone] = useState();
  const [empresaCnpj, setEmpresaCnpj] = useState();
  const [empresaEmail, setEmpresaEmail] = useState();
  const [empresaEndereco, setEmpresaEndereco] = useState();
  const [empresaEstado, setEmpresaEstado] = useState();
  const [empresaCidade, setEmpresaCidade] = useState();
  const [empresaMensagem, setEmpresaMensagem] = useState();
  const [empresaCodigo, setEmpresaCodigo] = useState();
  const [empresaImagem, setEmpresaImagem] = useState();
  const [empresaResponsavel, setEmpresaResponsavel] = useState();
  const [empresaSite, setEmpresaSite] = useState();

  const [myBase64, setMyBase64] = useState();

  const navigate = useNavigate();
  const goEnviado = () => {
    navigate("/enviados");
  };

  const goSair = () => {
    localStorage.removeItem("empresa");
    navigate("/");
  };
  const goMenu = () => {
    navigate("/menu");
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

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
  useEffect(() => {
    if (localStorage.getItem("empresa") === null) {
      navigate("/");
    } else {
      var empresaJson = localStorage.getItem("empresa");
      const emp = JSON.parse(empresaJson);
      setEmpresaNome(emp.nome);
      setEmpresaCelular(emp.celular);
      setEmpresaTelefone(emp.telefone);
      setEmpresaCnpj(emp.cnpj);
      setEmpresaEmail(emp.email);
      setEmpresaEndereco(emp.endereco);
      setEmpresaEstado(emp.estado);
      setEmpresaCidade(emp.cidade);
      setEmpresaMensagem(emp.mensagem);
      setEmpresaCodigo(emp.codigo);
      setEmpresaImagem(emp.imagem);
      setEmpresaResponsavel(emp.responsavel);
      setEmpresaSite(emp.site);
    }
  }, []);

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
    mes = mes.toString().padStart(2, "0");
    const ano = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const StringdataAtual = dia + "/" + mes + "/" + ano + " " + h + ":" + m;
    const dataConversao = ano + "-" + mes + "-" + dia;

    //CADASTRAR NOVO
    await addDoc(collection(db, "emailmm"), {
      nome: nome,
      doc: cpf,
      email: email,
      valor: valor,
      obs: obs,
      enviaEmail: enviaEmail,
      base64PDF: base64PDF,
      dataEnvio: StringdataAtual,
      dataEnvioConversao: dataConversao,
      empresaCodigo: empresaCodigo,
    })
      .then(() => {
        console.log("gravado no banco");
      })
      .catch((error) => {
        console.log("erro ao gravar em banco" + error);
      });
  }

  function limpaCampos() {
    handleClose();
  }
  

  async function EnviarEmail() {
    setLoading(true);
    setTextoBotao("Enviando E-mail");
    const data = {
      nome: nome,
      doc: cpf,
      email: email,
      valor: valor,
      obs: obs,
      enviaEmail: enviaEmail,
      empresaNome: empresaNome,
      empresaCelular: empresaCelular,
      empresaTelefone: empresaTelefone,
      empresaCnpj: empresaCnpj,
      empresaEmail: empresaEmail,
      empresaEndereco: empresaEndereco,
      empresaEstado: empresaEstado,
      empresaCidade: empresaCidade,
      empresaMensagem: empresaMensagem,
      empresaCodigo: empresaCodigo,
      empresaImagem: empresaImagem,
      empresaResponsavel: empresaResponsavel,
      empresaSite: empresaSite,
      //imagemBase64:myBase64
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                goMenu();
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {empresaNome}
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
                      goMenu();
                    }}
                  >
                    Voltar para o Menu
                  </MenuItem>
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
                  <MenuItem
                    onClick={() => {
                      goSair();
                    }}
                  >
                    Sair
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
          <Divider textAlign="left">Dados do Paciente</Divider>
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
            <Divider textAlign="left">Procedimentos</Divider>
            <br></br>

            <FormControl sx={{ width: 1500, maxWidth: "100%" }}>
              <InputLabel id="demo-multiple-name-label">
                Procedimento
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                input={<OutlinedInput label="Procedimento" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br></br>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField id="outlined" label="Valor" fullWidth />
            </Box>
            <div className="d-grid gap-2">  
            <Button variant="contained" sx={{ mt: 2, mb: 3 }}>
              Adicionar
            </Button>
            </div>
            <br></br>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Procedimento </TableCell>
                    <TableCell align="right">Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br></br>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Observação"
                id="obs"
                value={obs}
                onChange={(e) => setObs(e.target.value.toUpperCase())}
                helperText="Observação sobre os procedimentos"
              />
            </Box>

            <br></br>
            <Divider textAlign="left">Valor do Orçamento</Divider>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Valor"
                pattern="\d*"
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
              <Button
                variant="contained"
                onClick={EnviarEmail}
                sx={{ mt: 1, mb: 3 }}
              >
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
