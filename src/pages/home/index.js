import { useState, useEffect } from "react";
import "./index.css";
import Api from "../../Api";
import { db } from "../../firebaseConection";
import { collection, addDoc } from "firebase/firestore";
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
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import HeaderApp from "../../components/headerApp";
//import { Buffer } from 'buffer';

function Home() {
  const [loading, setLoading] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Enviar");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [origem, setOrigem] = useState("CASCAVEL-PR");
  const [destino, setDestino] = useState("CASCAVEL-PR");
  const [valor, setValor] = useState("");
  const [obs, setObs] = useState("");
  const [preVisualiza, setPreVisualiza] = useState(false);
  const [enviaEmail, setEnviaEmail] = useState(true);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);

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

  const navigate = useNavigate();

  const formatCurrency = (value, currency, localeString) => {
    const options = { style: "currency", currency };
    setValor(value.toLocaleString(localeString, options));
  };

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
    }
    AddEmail(base64PDF);
  }
  //--banco de dados
  async function AddEmail(base64PDF) {
    const date = new Date();
    const dia = date.getDate().toString().padStart(2, "0");
    let mes = date.getMonth() + 1;
    mes = mes.toString().padStart(2, "0");
    const ano = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const StringdataAtual = dia + "/" + mes + "/" + ano + " " + h + ":" + m;
    const dataConversao = ano + "-" + mes + "-" + dia;

    //CADASTRAR NOVO
    await addDoc(collection(db, "emailmm"), {
      nome: nome,
      doc: cpf,
      email: email,
      origem: origem,
      destino: destino,
      valor: valor,
      obs: obs,
      enviaEmail: enviaEmail,
      cb1: checked1,
      cb2: checked2,
      cb3: checked3,
      cb4: checked4,
      cb5: checked5,
      cb6: checked6,
      cb7: checked7,
      cb8: checked8,
      cb9: checked9,
      base64PDF: base64PDF,
      dataEnvio: StringdataAtual,
      dataEnvioConversao: dataConversao,
      empresaCodigo: empresaCodigo,
    })
      .then(() => {
        console.log("gravado no banco");
      })
      .catch((error) => {
        console.log("erro ao gravar em banco" + error);
      });
  }

  function mudaChe1() {
    if (checked1) {
      setChecked1(false);
    } else {
      setChecked1(true);
    }
  }
  function mudaChe2() {
    if (checked2) {
      setChecked2(false);
    } else {
      setChecked2(true);
    }
  }
  function mudaChe3() {
    if (checked3) {
      setChecked3(false);
    } else {
      setChecked3(true);
    }
  }
  function mudaChe4() {
    if (checked4) {
      setChecked4(false);
    } else {
      setChecked4(true);
    }
  }
  function mudaChe5() {
    if (checked5) {
      setChecked5(false);
    } else {
      setChecked5(true);
    }
  }
  function mudaChe6() {
    if (checked6) {
      setChecked6(false);
    } else {
      setChecked6(true);
    }
  }
  function mudaChe7() {
    if (checked7) {
      setChecked7(false);
    } else {
      setChecked7(true);
    }
  }
  function mudaChe8() {
    if (checked8) {
      setChecked8(false);
    } else {
      setChecked8(true);
    }
  }
  function mudaChe9() {
    if (checked9) {
      setChecked9(false);
    } else {
      setChecked9(true);
    }
  }

  function limpaCampos() {
    //setChecked1(false);
    //setChecked2(false);
    //setChecked3(false);
    //setChecked4(false);
    //setChecked5(false);
    //setChecked6(false);
    //setChecked7(false);
    //setChecked8(false);
    //setChecked9(false);
    //setNome("");
    //setCpf("");
    //setEmail("");
    //setOrigem("CASCAVEL-PR");
    //setDestino("CASCAVEL-PR");
    //setValor("");
    //setObs("");
  }
  // function toDataUrl(url, callback) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //       var reader = new FileReader();
  //       reader.onloadend = function() {
  //           callback(reader.result);
  //       }
  //       reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }

  async function EnviarEmail() {
    if (email.length < 1) {
      toast.error("O email deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (nome.length < 1) {
      toast.error("O nome deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (origem.length < 1) {
      toast.error("A origem deve ser informada.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (destino.length < 1) {
      toast.error("O destino deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (valor.length < 1) {
      toast.error("O valor deve ser informado.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    //toDataUrl(empresaImagem, function(myBase64Par) {
    //const buf = Buffer.from(myBase64Par, 'base64');
    //setMyBase64(buf);
    //console.log(myBase64Par);
    //console.log(buf);

    //});

    setLoading(true);
    setTextoBotao("Enviando E-mail");

    const data = {
      nome: nome,
      doc: cpf,
      email: email,
      origem: origem,
      destino: destino,
      valor: valor,
      obs: obs,
      enviaEmail: enviaEmail,
      cb1: checked1,
      cb2: checked2,
      cb3: checked3,
      cb4: checked4,
      cb5: checked5,
      cb6: checked6,
      cb7: checked7,
      cb8: checked8,
      cb9: checked9,
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
      //imagemBase64:myBase64
    };

    await Api.post("/send-mail", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        limpaCampos();

        montaPDF(response);

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
        toast.error("Erro ao enviar E-mail, verifique o E-Mail informado.", {
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

    setTextoBotao("Enviar");
    setLoading(false);
  }

  return (
    <div className="App">
      <HeaderApp nome={empresaNome}></HeaderApp>

      <Container fluid="md" className="justify-content-md-center container">
        <ToastContainer />
        <Paper elevation={0} className="paper">
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
            <Divider textAlign="left">Serviços</Divider>
            <br></br>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id="checkbox1"
                    color="default"
                    checked={checked1}
                    onClick={() => {
                      mudaChe1();
                    }}
                  />
                }
                label="CARGA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox2"
                    checked={checked2}
                    onClick={() => {
                      mudaChe2();
                    }}
                  />
                }
                label="DESCARGA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox3"
                    checked={checked3}
                    onClick={() => {
                      mudaChe3();
                    }}
                  />
                }
                label="AJUDANTES"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox4"
                    checked={checked4}
                    onClick={() => {
                      mudaChe4();
                    }}
                  />
                }
                label="MATERIAL PARA EMBALAGEM"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox5"
                    checked={checked5}
                    onClick={() => {
                      mudaChe5();
                    }}
                  />
                }
                label="EMBALAGEM DE LOUÇAS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox6"
                    checked={checked6}
                    onClick={() => {
                      mudaChe6();
                    }}
                  />
                }
                label="EMBALAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox7"
                    checked={checked7}
                    onClick={() => {
                      mudaChe7();
                    }}
                  />
                }
                label="DESMONTAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox8"
                    checked={checked8}
                    onClick={() => {
                      mudaChe8();
                    }}
                  />
                }
                label="MONTAGEM DE MOVEIS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    id="checkbox9"
                    checked={checked9}
                    onClick={() => {
                      mudaChe9();
                    }}
                  />
                }
                label="SERVIÇO DE PERSONAL ORGANIZER"
              />
            </FormGroup>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Observação"
                id="obs"
                value={obs}
                onChange={(e) => setObs(e.target.value.toUpperCase())}
                helperText="Observação sobre os serviços prestados"
              />
            </Box>

            <br></br>
            <Divider textAlign="left">Localização</Divider>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Origem"
                id="origem"
                value={origem}
                onChange={(e) => setOrigem(e.target.value.toUpperCase())}
              />
            </Box>
            <br></br>
            <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Destino"
                id="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value.toUpperCase())}
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
                value={valor}
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
                    color="default"
                    checked={enviaEmail}
                    onChange={() => {
                      desativaEmail();
                    }}
                    name="jason"
                  />
                }
                label="Envia E-Mail"
              />
              <FormControlLabel
                control={
                  <Switch
                    color="default"
                    checked={preVisualiza}
                    onChange={() => {
                      ativaVisualizacao();
                    }}
                    name="jason"
                  />
                }
                label="Visualiza PDF"
              />
              <Button
                variant="contained"
                onClick={EnviarEmail}
                sx={{
                  mt: 1,
                  mb: 3,
                  background: "#212121",
                  "&:hover": { backgroundColor: "#424242" },
                }}
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
