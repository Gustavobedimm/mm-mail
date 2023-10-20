import { useState, useEffect } from "react";
import { db } from "../../firebaseConection";
import "./index.css";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
//bootstrao
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

//import nodemailer from 'nodemailer';

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
        //ordena por sequencia
        //lista2.sort(function (a, b) {
       //   return b.sequencia - a.sequencia;
       // });
        //pega o jogo de maior sequencia
        //const jogo = lista2[0];
        setListaEnviados(lista2);
        //busca jogadores do ranking para adicionar no jogo posteriormente
      });
    }
    loadEnviados();
  }, []);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
                  <SettingsIcon />
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
        
        <Paper elevation={1} className="paperModificado">
        {listaEnviados.map((email) => {
                  return (
    <Card className="cardModificado">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {email.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Email do Cliente : {email.email}</p>
            <p>Enviado em : {email.dataEnvio}</p>
            <p>Observação: {email.obs}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Valor do orçamento R$ {email.valor}
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
