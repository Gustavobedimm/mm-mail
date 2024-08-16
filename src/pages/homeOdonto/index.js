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

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
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

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [valueBtnNav, setValueBtnNav] = useState(0);

  const [valueTab, setValueTab] = useState('1');

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const navigate = useNavigate();
 

  const formatCurrency = (value, currency, localeString) => {
    const options = { style: "currency", currency };
    setValorTotal(value.toLocaleString(localeString, options));
  };
  function handleNavigation(newValue){
    setValueBtnNav(newValue);
    let index = valueTab;
    if(index === '1'){
      index = '2';
      setValueTab(index);
      return;
    }
    if(index === '2'){
      index = '3';
      setValueTab(index);
      return;
    }
    if(index === '3'){
      index = '1'
      setValueTab(index);
      return;
    }
  }

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
  setValue('')
  setInputValue('');
  
}
function handleDelete(index_aux){
  let listaTmp = [...listaProcedimentosTmp];
  //remove o documento pelo id
  listaTmp.map((row,index) => {
    if(index_aux === index){
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
      setTimeout(() => {
        window.open(fileURL);
      });
      //window.open(fileURL);
    }
    //AddEmail(base64PDF);
  }

  //--banco de dados
  //async function AddEmail(base64PDF) {
 // }

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

        
      <TabContext value={valueTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Paciente" value="1" />
            <Tab label="Procedimentos" value="2" />
            <Tab label="Total" value="3" />
            
          </TabList>
        </Box>
        <TabPanel value="1">
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
                label="Documento"
                id="documento"
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Celular"
                id="celular"
              />
            </Box>
        </TabPanel>
        <TabPanel value="2">
          <Autocomplete
              disablePortal
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              }}
              
              id="combo-box-demo"
              options={listaProcedimentos}
              sx={{ width: 1500, maxWidth: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Procedimento" />
              )}
            />
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Dente"
                id="dente"
              />
            </Box>
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
                  {listaProcedimentosTmp.map((row,index) => (
                    <TableRow key={index}sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.label}</TableCell>
                      <TableCell align="right">{row.valor}</TableCell>
                      <TableCell align="right"><DeleteIcon color="secondary" onClick={() => {handleDelete(index)}}></DeleteIcon></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></TabPanel>
            <TabPanel value="3">
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
              <br></br>
              <div className="d-grid gap-2">
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
            
        </TabPanel>
        
      </TabContext>
    


        <Paper elevation={0} className="paper">
          
          <Form>
            
            

            
          
            

            
            
            <br></br>
            
          </Form>
        </Paper>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={valueBtnNav}
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
      >
         <BottomNavigationAction label="Proximo" icon={<ArrowCircleRightIcon />} />
        
      </BottomNavigation>
    </Box>
    </Paper>
    </div>
  );
}

export default Home;
