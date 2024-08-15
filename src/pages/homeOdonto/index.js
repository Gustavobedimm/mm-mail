import { useState, useEffect } from "react";
import "./index.css";
import Api from "../../Api";
import HeaderApp from "../../components/headerApp";
import { db } from "../../firebaseConection";
import { collection, getDocs } from "firebase/firestore";
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
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from '@mui/icons-material/Delete';

//import { Buffer } from 'buffer';

function Home() {
  const [loading, setLoading] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Enviar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [valor, setValor] = useState("");
  const [valorTotal, setValorTotal] = useState("");
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
  const [listaProcedimentos, setListaProcedimentos] = useState([]);
  const [listaProcedimentosTmp, setListaProcedimentosTmp] = useState([]);

  const [value, setValue] = useState(listaProcedimentos[0]);

  const navigate = useNavigate();
 

  const formatCurrency = (value, currency, localeString) => {
    const options = { style: "currency", currency };
    setValorTotal(value.toLocaleString(localeString, options));
  };

  //App BAR
function handleAdd (){
  setListaProcedimentosTmp([...listaProcedimentosTmp,{ id: value.id , label: value.label, valor: valor }]);
  let lista2 = [...listaProcedimentosTmp];
  let total = 0;
  lista2.push({id: value.id , label: value.label, valor: valor});
  lista2.map((row) => {
    total = total + parseFloat(row.valor);
  })
  var f2 = total.toLocaleString('pt-br', {minimumFractionDigits: 2});
  setValorTotal(f2);
  setValor("");
}
function handleDelete(rowAux){
  let listaTmp = [...listaProcedimentosTmp];
  //remove o documento pelo id
  listaTmp.map((row,index) => {
    if(row.id === rowAux.id){
      listaTmp.splice(index,1);
    }
  })
  //recalcula o total do orcamento
  let total = 0;
  listaTmp.map((row) => {
    total = total + parseFloat(row.valor);
    
  })
  var f2 = total.toLocaleString('pt-br', {minimumFractionDigits: 2});
  setValorTotal(f2);
  setListaProcedimentosTmp(listaTmp);
}

  async function getProcedimentos() {
    const postsRef = collection(db, "procedimentos");
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            label: doc.data().descricao,
            id: doc.id,
            valor: doc.data().valor,
          });
        });
        setListaProcedimentos(lista);
      })
      .catch((error) => {
        console.log("deu algum erro ao buscar" + error);
      });
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
    }
    getProcedimentos();
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
  }

  function limpaCampos() {
  }

  async function EnviarEmail() {
    setLoading(true);
    setTextoBotao("Enviando E-mail");
    const data = {
      nome: nome,
      email: email,
      valorTotal: valorTotal,
      obs: obs,
      procedimentos : listaProcedimentosTmp,
      //dados da empresa
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
    };
    console.log(data);

    await Api.post("/send-mail-odonto", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        limpaCampos();
        montaPDF(response);
      })
      .catch((error) => {
          console.log(error);       
      });

    setTextoBotao("Enviar");
    setLoading(false);
  }

  return (
    <div className="App">
      <HeaderApp nome={empresaNome}></HeaderApp>
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

            <Autocomplete
              disablePortal
              inputValue={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              
              id="combo-box-demo"
              options={listaProcedimentos}
              sx={{ width: 1500, maxWidth: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Procedimento" />
              )}
            />
            <br></br>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                id="outlined"
                label="Valor"
                fullWidth
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </Box>
            <div className="d-grid gap-2">
              <Button variant="contained" sx={{ mt: 2, mb: 3 }} onClick={() => {handleAdd()}}>
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
                    <TableCell align="right">Apagar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaProcedimentosTmp.map((row) => (
                    <TableRow key={row.id}sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.label}</TableCell>
                      <TableCell align="right">{row.valor}</TableCell>
                      <TableCell align="right"><DeleteIcon color="secondary" onClick={() => {handleDelete(row)}}></DeleteIcon></TableCell>
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
                value={valorTotal}
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
