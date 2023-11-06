import { useState, useEffect } from "react";
import { db } from "../../firebaseConection";
import "./index.css";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
//bootstrao
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

function Home() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [listaEnviados, setListaEnviados] = useState([]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const goEnviado = () => {
    navigate("/");
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

  useEffect(() => {
    async function loadEnviados() {
      const unsub = onSnapshot(collection(db, "emailmm"), (snapshot2) => {
        let lista2 = [];
        snapshot2.forEach((doc) => {
          lista2.push({
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
          });
        });
        setListaEnviados(lista2);
      });
    }
    loadEnviados();
  }, []);

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
                      goEnviado();
                    }}
                  >
                    Enviar orçamento
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Container fluid="md" className="justify-content-md-center container">
        <Paper elevation={0} className="paperModificado">
          {listaEnviados.map((email) => {
            return (
              <Card className="cardModificado">
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {email.nome} {email.enviaEmail && <EmailIcon />}
                      {!email.enviaEmail && <UnsubscribeIcon />}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email : {email.email} enviado em {email.dataEnvio}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Origem: {email.origem} Destino : {email.destino}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <b>R$ {email.valor}</b>
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      montaPDF(email.base64PDF);
                    }}
                  >
                    <DownloadForOfflineIcon></DownloadForOfflineIcon>
                    <b> Baixar PDF</b>
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Paper>
      </Container>
    </div>
  );
}

export default Home;
