import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
//bootstrao

import Button from "@mui/material/Button";
import { db } from "../../firebaseConection";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
} from "firebase/firestore";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
      Material Design
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const [nome, setNome] = useState();
  const [codigo, setCodigo] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goInicio = () => {
        navigate("/menu");
  };

  async function buscarEmpresa() {
    setLoading(true);
    var erro = false;
    if (!codigo) {
      erro = true;
      setCodigo("");
      setLoading(false);
    } else {
      const codigoTMP = codigo.trim();
      if (codigoTMP.length === 0) {
        erro = true;
        setCodigo("");
        setLoading(false);
      }
    }
    if (erro) {
      toast.error("Informe o código da empresa.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const postRef = doc(db, "empresas", codigo);
      await getDoc(postRef)
        .then((snapshot) => {
          const emp = {
            nome: snapshot.data().nome,
            codigo: codigo,
            celular: snapshot.data().celular,
            telefone: snapshot.data().telefone,
            cnpj: snapshot.data().cnpj,
            email: snapshot.data().email,
            endereco: snapshot.data().endereco,
            estado: snapshot.data().estado,
            cidade: snapshot.data().cidade,
            mensagem: snapshot.data().mensagem,
            imagem: snapshot.data().imagem,
            responsavel: snapshot.data().responsavel,
            site: snapshot.data().site,
            tipo: snapshot.data().tipo,
          };
          var jsonAux = JSON.stringify(emp);
          localStorage.setItem("empresa", jsonAux);

          goInicio();
        })
        .catch((error) => {
          toast.error("Empresa não encontrada.", {
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
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/*<Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>*/}
          <Typography component="h1" variant="h5">
            Bem-vindo de volta!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="código"
              pattern="\d*"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setCodigo(e.target.value)}
              autoFocus
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim"
            />*/}
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
