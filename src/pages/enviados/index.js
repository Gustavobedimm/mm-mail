import { useState, useEffect } from "react";
import { db } from "../../firebaseConection";
import "./index.css";
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import HeaderApp from "../../components/headerApp";

//bootstraoz
import Container from "react-bootstrap/Container";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import EmailIcon from "@mui/icons-material/Email";

//toastify
import "react-toastify/dist/ReactToastify.css";
//mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

function Home() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [listaEnviados, setListaEnviados] = useState([]);
  const [empresaNome, setEmpresaNome] = useState();
  const [empresaCelular, setEmpresaCelular] = useState();
  const [empresaTelefone, setEmpresaTelefone] = useState();
  const [empresaCnpj, setEmpresaCnpj] = useState();
  const [empresaEmail, setEmpresaEmail] = useState();
  const [empresaEndereco, setEmpresaEndereco] = useState();
  const [empresaEstado, setEmpresaEstado] = useState();
  const [empresaCidade, setEmpresaCidade] = useState();
  const [empresaMensagem, setEmpresaMensagem] = useState();
  const [empresaCodigo, setEmpresaCodigo] = useState("0000");
  const [empresaImagem, setEmpresaImagem] = useState();
  const [empresaResponsavel, setEmpresaResponsavel] = useState();
  const [empresaSite, setEmpresaSite] = useState();
  const [empresaTipo, setEmpresaTipo] = useState();

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [valor, setValor] = useState("");
  const [base64, setBase64] = useState("");
  const [dataEnvio, setDataEnvio] = useState("");
  const [obs, setObs] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = (email) => {
    setId(email.id);
    setNome(email.nome);
    setEmail(email.email);
    setOrigem(email.origem);
    setDestino(email.destino);
    setValor(email.valor);
    setBase64(email.base64PDF);
    setDataEnvio(email.dataEnvio);
    setObs(email.obs);

    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goSair = () => {
    localStorage.removeItem("empresa");
    navigate("/");
  };

  const navigate = useNavigate();
  const goEnviado = () => {
    navigate("/inicio");
  };
  const goMenu = () => {
    navigate("/menu");
  };

  function montaPDF(baseString) {
    const base64PDF = baseString;
    var byteCharacters = atob(base64PDF);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: "application/pdf;base64" });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
  async function loadEnviados(codigo,tipo) {
    if(tipo === 1){
      const q = query(
        collection(db, "emailmm"),
        where("empresaCodigo", "==", codigo)
      );
      const querySnapshot = await getDocs(q);
      //onSnapshot é para dados em tempo real
    //const unsub = onSnapshot(collection(db, "emailmm"), (snapshot2) => {
    let lista2 = [];
    //snapshot2.forEach((doc) => {
    querySnapshot.forEach((doc) => {
      lista2.push({
        id: doc.id,
        nome: doc.data().nome,
        doc: doc.data().doc,
        email: doc.data().email,
        origem: doc.data().origem,
        destino: doc.data().destino,
        valor: doc.data().valor,
        enviaEmail: doc.data().enviaEmail,
        obs: doc.data().obs,
        cb1: doc.data().cb1,
        cb2: doc.data().cb2,
        cb3: doc.data().cb3,
        cb4: doc.data().cb4,
        cb5: doc.data().cb5,
        cb6: doc.data().cb6,
        cb7: doc.data().cb7,
        cb8: doc.data().cb8,
        cb9: doc.data().cb9,
        base64PDF: doc.data().base64PDF,
        dataEnvio: doc.data().dataEnvio,
        dataEnvioConversao: new Date(doc.data().dataEnvioConversao),
      });
    });
    lista2.sort(function (a, b) {
      return a.dataEnvioConversao < b.dataEnvioConversao;
    });
    setListaEnviados(lista2);
    }else if(tipo === 2){
      const q = query(collection(db, "emailod"));
      const querySnapshot = await getDocs(q);
      let lista2 = [];
      querySnapshot.forEach((doc) => {
        lista2.push({
          id: doc.id,
          nome: doc.data().nome,
          valorTotal: doc.data().valorTotal,
          email: doc.data().email,
          enviaEmail: doc.data().enviaEmail,
          celular: doc.data().celular,
          documento : doc.data().documento,
          base64PDF: doc.data().base64PDF,
        });
      }
    );
    setListaEnviados(lista2);
    }
  }
  async function deletarOrcamento(id) {
    if(empresaTipo === 1){
      const docRef = doc(db, "emailmm", id);
      await deleteDoc(docRef);
          handleClickClose();
    }
    else if (empresaTipo === 2){
      const docRef = doc(db, "emailod", id);
      await deleteDoc(docRef);
          handleClickClose();
    }
      let lista2 = [];
      lista2 = listaEnviados;
      lista2.map((email,index) => {
        if(email.id === id){
          lista2.splice(index, 1);
        }
      })
      setListaEnviados(lista2);
  }

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
      setEmpresaTipo(emp.tipo);
      loadEnviados(emp.codigo,emp.tipo);
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <HeaderApp nome={empresaNome}></HeaderApp>

      <Container fluid="md" className="justify-content-md-center container">
        <Paper elevation={0} className="paperModificado">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell align="left">Valor</TableCell>
                  <TableCell align="left">Abrir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaEnviados.map((email) => {
                  return (
                    <TableRow
                      key={email.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {email.nome}
                      </TableCell>
                      <TableCell align="left">{email.valor}</TableCell>
                      <TableCell align="left">
                        <OpenInNewIcon
                          onClick={() => {
                            handleClickOpen(email);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <>
          <Dialog fullScreen open={open} onClose={handleClickClose}>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClickClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Orçamento
                </Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deletarOrcamento(id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List>
              <ListItemButton>
                <ListItemText primary={nome} secondary={email} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary="Origem" secondary={origem} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary="Destino" secondary={destino} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary="Valor do orçamento" secondary={valor} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary="Data Envio" secondary={dataEnvio} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText primary="Observação" secondary={obs} />
              </ListItemButton>
            </List>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 1, mb: 3, ml: 1, mr: 1 }}
              onClick={() => {
                montaPDF(base64);
              }}
            >
              Abrir PDF
            </Button>
          </Dialog>
        </>
      </Container>
    </div>
  );
}

export default Home;
