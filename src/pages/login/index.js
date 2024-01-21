import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from "react";
//bootstrao
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import { db } from "../../firebaseConection";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
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

import "./index.css";
import { MotionConfigContext } from 'framer-motion';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Orçamentos Online
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [nome, setNome] = useState();
  const [codigo, setCodigo] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const goInicio = () => {
    navigate("/inicio");
  };

  async function buscarEmpresa() {
    setLoading(true);
    
    const postRef = doc(db, "empresas", codigo);
    await getDoc(postRef)
      .then((snapshot) => {
        const emp = {
          nome: snapshot.data().nome,
          codigo: codigo,
          celular:snapshot.data().celular,
          telefone:snapshot.data().telefone,
          cnpj:snapshot.data().cnpj,
          email:snapshot.data().email,
          endereco:snapshot.data().endereco,
          estado:snapshot.data().estado,
          cidade:snapshot.data().cidade,
          mensagem:snapshot.data().mensagem,
          imagem:snapshot.data().imagem,
          responsavel:snapshot.data().responsavel,
          site:snapshot.data().site
        }
        var jsonAux = JSON.stringify(emp);
        localStorage.setItem('empresa' , jsonAux);
        
        goInicio();
      })
      .catch((error) => {
        setNome("Empresa não encontrada.");
        console.log("Erro ao buscar post" + error);
      });
    setLoading(false);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="código"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setCodigo(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={buscarEmpresa}
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
              Entrar
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}