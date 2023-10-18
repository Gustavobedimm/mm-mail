import { useState } from "react";
import "./index.css";
import Api from "../../Api";
//bootstrao
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

//import nodemailer from 'nodemailer';

function Home() {
  const [loading, setLoading] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Enviar");
  const [nome, setNome] = useState("Gustavo Bedim");
  const [cpf, setCpf] = useState("089.168.219-83");
  const [email, setEmail] = useState("gustavo_bmazutti@hotmail.com");
  const [emailCc, setEmailCc] = useState("gustavo_bmazutti@hotmail.com");
  const [origem, setOrigem] = useState("Cascavel-PR");
  const [destino, setDestino] = useState("Cascavel-PR");
  const [valor, setValor] = useState("9.000,00");

  async function EnviarEmail() {
    setLoading(true);
    let checkbox1 = document.getElementById("checkbox1").checked;
    let checkbox2 = document.getElementById("checkbox2").checked;
    let checkbox3 = document.getElementById("checkbox3").checked;
    let checkbox4 = document.getElementById("checkbox4").checked;
    let checkbox5 = document.getElementById("checkbox5").checked;
    let checkbox6 = document.getElementById("checkbox6").checked;
    let checkbox7 = document.getElementById("checkbox7").checked;
    let checkbox8 = document.getElementById("checkbox8").checked;
    let checkbox9 = document.getElementById("checkbox9").checked;

    const data = {
      nome: nome,
      doc: cpf,
      email: email,
      origem: origem,
      destino: destino,
      valor: valor,
      cb1: checkbox1,
      cb2: checkbox2,
      cb3: checkbox3,
      cb4: checkbox4,
      cb5: checkbox5,
      cb6: checkbox6,
      cb7: checkbox7,
      cb8: checkbox8,
      cb9: checkbox9,
    };

    setTextoBotao("Enviando E-mail");
    await Api.post("/send-mail", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        //status 200 sucesso
        //console.log(response.status);
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
        toast.error("Erro ao enviar E-mail.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        //status 400 erro
        //console.log(error.status);
      });
    setTextoBotao("Enviar");
    setLoading(false);
  }
  //function mudaStatus1(){
  //  
  //  if(checkbox.checked){
  //    alert("checkboxmarcado")
  //  }else{alert(checkbox);}
  //}
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
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mudanças Mazutti
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container fluid="md" className="justify-content-md-center container">
        <ToastContainer />
        <Paper elevation={1} className="paper">
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
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Documento"
                id="doc"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
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
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Copia para"
                id="CC"
                value={emailCc}
                onChange={(e) => setEmailCc(e.target.value)}
              />
            </Box>

            <br></br>
            <Divider textAlign="left">Serviços</Divider>
            <br></br>
            <FormGroup>
              <FormControlLabel  control={<Checkbox id="checkbox1"/>} label="CARGA"/>
              <FormControlLabel control={<Checkbox id="checkbox2"/>} label="DESCARGA"/>
              <FormControlLabel control={<Checkbox id="checkbox3"/>} label="AJUDANTES"/>
              <FormControlLabel
                control={<Checkbox id="checkbox4" />}
                label="MATERIAL PARA EMBALAGEM"
              />
              <FormControlLabel
                control={<Checkbox id="checkbox5" />}
                label="EMBALAGEM DE LOUÇAS"
              />
              <FormControlLabel
                control={<Checkbox id="checkbox6"/>}
                label="EMBALAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={<Checkbox id="checkbox7"/>}
                label="DESMONTAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={<Checkbox id="checkbox8"/>}
                label="MONTAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={<Checkbox id="checkbox9"/>}
                label="SERVIÇO DE PERSONAL ORGANIZER"
              />
            </FormGroup>

            <br></br>
            <Divider textAlign="left">Localização</Divider>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Origem"
                id="origem"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Destino"
                id="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
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
                onChange={(e) => setValor(e.target.value)}
              />
            </Box>
            <br></br>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" size="md" onClick={EnviarEmail}>
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
