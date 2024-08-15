import { useState, useEffect } from "react";
import "./index.css";
import { db } from "../../firebaseConection";
import { doc, updateDoc } from "firebase/firestore";
//bootstrao
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import HeaderApp from "../../components/headerApp";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
//mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


function Home() {
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
  const [empresaTipo , setEmpresaTipo] = useState();

  const navigate = useNavigate();
  
  async function alterarEmpresa(){
    const docRef = doc(db, "empresas" , empresaCodigo);
    await updateDoc(docRef, {
      nome : empresaNome,
      email : empresaEmail,
      cnpj : empresaCnpj,
      cidade : empresaCidade,
      mensagem : empresaMensagem,
      celular : empresaCelular,
      telefone : empresaTelefone,
      endereco : empresaEndereco,
      estado : empresaEstado,
      imagem : empresaImagem,
      responsavel : empresaResponsavel,
      
    }).then(() => {
      //Atualiza LocalStorage
      const emp = {
        nome: empresaNome,
        codigo: empresaCodigo,
        celular: empresaCelular,
        telefone: empresaTelefone,
        cnpj: empresaCnpj,
        email: empresaEmail,
        endereco: empresaEndereco,
        estado: empresaEstado,
        cidade: empresaCidade,
        mensagem: empresaMensagem,
        imagem: empresaImagem,
        responsavel: empresaResponsavel,
        tipo : empresaTipo,
      };
      var jsonAux = JSON.stringify(emp);
      localStorage.setItem("empresa", jsonAux);

      toast.success("Dados alterados com sucesso.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
    }).catch((error) => {
      toast.error(error, {
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
   }


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
    setEmpresaTipo(emp.tipo);
    
  }
  }, []);

  return (
    <div className="App">
      <HeaderApp nome={empresaNome}></HeaderApp>

      <Container fluid="md" className="justify-content-md-center container">
        <ToastContainer />
        <Paper elevation={0} className="paper">
          
          <Form>
          <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Código"
                id="cliente"
                value={empresaCodigo}
                onChange={(e) => setEmpresaCodigo(e.target.value)}
                autoFocus
                InputProps={{
                  readOnly: true,
                }}
                disabled
              />
            </Box>
            <br></br>
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
                value={empresaImagem}
                onChange={(e) => setEmpresaImagem(e.target.value)}
                autoFocus
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
            <TextField
            fullWidth
          id="outlined-multiline-flexible"
          label="Mensagem"
          multiline
          maxRows={4}
          value={empresaMensagem}
          onChange={(e) => setEmpresaMensagem(e.target.value)}
        
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
            <TextField
            disabled
            fullWidth
          id="outlined-multiline-flexible"
          label="Tipo"
          multiline
          maxRows={4}
          value={empresaTipo}
          onChange={(e) => setEmpresaMensagem(e.target.value)}
        
              />
            </Box>
            <br></br>
            
          </Form>
          <div className="d-grid gap-2">
          <Button variant="contained"  sx={{mt: 1,mb: 3 }} onClick={alterarEmpresa}>Salvar Alterações</Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Home;
