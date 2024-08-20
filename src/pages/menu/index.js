import { useState, useEffect } from "react";
import "./index.css";
import HeaderApp from "../../components/headerApp";
//bootstrao
import Container from "react-bootstrap/Container";
//toastify

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
//mui
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListOdonto } from "../../components/listMenuOdonto";

function Home() {
  const [empresaNome, setEmpresaNome] = useState();
  //const [empresaCelular, setEmpresaCelular] = useState();
  //const [empresaTelefone, setEmpresaTelefone] = useState();
  const [empresaCnpj, setEmpresaCnpj] = useState();
  //const [empresaEmail, setEmpresaEmail] = useState();
  const [empresaEndereco, setEmpresaEndereco] = useState();
  const [empresaEstado, setEmpresaEstado] = useState();
  const [empresaCidade, setEmpresaCidade] = useState();
  //const [empresaMensagem, setEmpresaMensagem] = useState();
  //const [empresaCodigo, setEmpresaCodigo] = useState();
  //const [empresaImagem, setEmpresaImagem] = useState();
  const [empresaResponsavel, setEmpresaResponsavel] = useState();
  //const [empresaSite, setEmpresaSite] = useState();
  const [tipoEmpresa, setTipoEmpresa] = useState();

  const navigate = useNavigate();
  const goSair = () => {
    localStorage.removeItem("empresa");
    navigate("/");
  };
  const goInicio = () => {
    var empresaJson = localStorage.getItem("empresa");
    const emp = JSON.parse(empresaJson);
    if (emp.tipo === 1) {
      navigate("/inicio");
    }
    if (emp.tipo === 2) {
      navigate("/inicio2");
    }
  };

  const goEnviados = () => {
    navigate("/enviados");
  };
  const goPerfil = () => {
    navigate("/perfil");
  };

  useEffect(() => {
    if (localStorage.getItem("empresa") === null) {
      navigate("/");
    } else {
      var empresaJson = localStorage.getItem("empresa");
      const emp = JSON.parse(empresaJson);
      setEmpresaNome(emp.nome);
      //setEmpresaCelular(emp.celular);
      //setEmpresaTelefone(emp.telefone);
      setEmpresaCnpj(emp.cnpj);
      //setEmpresaEmail(emp.email);
      setEmpresaEndereco(emp.endereco);
      setEmpresaEstado(emp.estado);
      setEmpresaCidade(emp.cidade);
      //setEmpresaMensagem(emp.mensagem);
      //setEmpresaCodigo(emp.codigo);
      //setEmpresaImagem(emp.imagem);
      setEmpresaResponsavel(emp.responsavel);
      //setEmpresaSite(emp.site);
      setTipoEmpresa(emp.tipo);
    }
  }, []);

  return (
    <div className="App">
      <HeaderApp nome={empresaNome}></HeaderApp>
      <Container fluid="md" className="justify-content-md-center container">
        <Paper elevation={0} className="paper">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {empresaResponsavel}
              </Typography>
              <Typography variant="h5" component="div">
                {empresaNome}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {empresaCnpj}
              </Typography>
              <Typography variant="body2">
                {empresaEndereco}
                <br />
                {empresaCidade} - {empresaEstado}
              </Typography>
            </CardContent>
          </Card>

          <List
            sx={{ width: "100%", bgcolor: "background.paper", mt: 1 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Selecione o Item
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => {
                goInicio();
              }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Novo orçamento" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              onClick={() => {
                goEnviados();
              }}
            >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Listagem de orçamentos" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              onClick={() => {
                goPerfil();
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Meus Dados" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              onClick={() => {
                goSair();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </List>

          {tipoEmpresa === 2 && <ListOdonto />}
        </Paper>
      </Container>
    </div>
  );
}

export default Home;
