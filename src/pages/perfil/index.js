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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { Buffer } from 'buffer';

function Home() {
  const [loading, setLoading] = useState(false);

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

  const [myBase64,setMyBase64] = useState();

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
    }else{
    var empresaJson = localStorage.getItem('empresa');
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

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => {
                  goMenu();
                }}>
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
          
          <Form>
          
          <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Nome da empresa"
                id="cliente"
                value={empresaNome}
                onChange={(e) => setEmpresaNome(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="CNPJ"
                id="cliente"
                value={empresaCnpj}
                onChange={(e) => setEmpresaCnpj(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="E-Mail"
                id="cliente"
                value={empresaEmail}
                onChange={(e) => setEmpresaEmail(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Responsavel"
                id="cliente"
                value={empresaResponsavel}
                onChange={(e) => setEmpresaResponsavel(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Telefone"
                id="cliente"
                value={empresaTelefone}
                onChange={(e) => setEmpresaTelefone(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Celular"
                id="cliente"
                value={empresaCelular}
                onChange={(e) => setEmpresaCelular(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Endereço"
                id="cliente"
                value={empresaEndereco}
                onChange={(e) => setEmpresaEndereco(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Cidade"
                id="cliente"
                value={empresaCidade}
                onChange={(e) => setEmpresaCidade(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Estado"
                id="cliente"
                value={empresaEstado}
                onChange={(e) => setEmpresaEstado(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="URL Imagem Logo"
                id="cliente"
                autoFocus
              />
            </Box>
            <br></br>
            
          </Form>
          <div className="d-grid gap-2">
          <Button variant="contained"  sx={{mt: 1,mb: 3 }}>Salvar</Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Home;
