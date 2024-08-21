import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import HeaderApp from "../../components/headerApp";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConection";
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Dialog from "@mui/material/Dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";

function Procedimentos() {
  const [empresaNome, setEmpresaNome] = useState();
  const [listaProcedimentos, setListaProcedimentos] = useState([]);
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState("");
  const [novo, setNovo] = useState();
  const [textoBotao, setTextoBotao] = useState("Cadastrar");
  const [pesquisa , setPesquisa] = useState('');

  const navigate = useNavigate();

  function handleNotify(error, mensagem) {
    if (error) {
      toast.error(mensagem, {
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
      toast.success(mensagem, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  async function loadProcedimentos() {
    const q = query(collection(db, "procedimentos"));
    const querySnapshot = await getDocs(q);
    let lista2 = [];
    querySnapshot.forEach((doc) => {
      lista2.push({
        id: doc.id,
        descricao: doc.data().descricao,
        valor: doc.data().valor,
      });
    });
    
    setListaProcedimentos(lista2);
  }

  function handleClickOpen(procedimento) {
    setTextoBotao("Salvar Alteração");
    setId(procedimento.id);
    setDescricao(procedimento.descricao);
    setValor(procedimento.valor);
    setNovo(false);
    setOpen(true);
  }
  function handleClickOpenNovo() {
    setTextoBotao("Cadastrar Novo");
    setId("");
    setDescricao("");
    setValor("");
    setOpen(true);
    setNovo(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  };
  async function AddProcedimento() {
    if (novo) {
      //ADICIONA PROCEDIMENTO SE A TELA ABRIR SEM DADOS
      await addDoc(collection(db, "procedimentos"), {
        descricao: descricao,
        valor: valor,
      })
        .then(() => {
          handleNotify(false, "Cadastrado com sucesso.");
        })
        .catch((error) => {
          handleNotify(true, "Erro ao cadastrar.");
        });
    } else {
      //ALTERA SE ABRIR OS DADOS DO PROCEDIMENTO
      const docRef = doc(db, "procedimentos", id);
      await updateDoc(docRef, {
        descricao: descricao,
        valor: valor,
      })
        .then(() => {
          handleNotify(false, "Alterado com sucesso.");
        })
        .catch((error) => {
          handleNotify(true, "Erro ao alterar procedimento.");
        });
    }
    setOpen(false);
  }
  async function deletarProcedimento(id) {
    const docRef = doc(db, "procedimentos", id);
    await deleteDoc(docRef)
      .then(() => {
        setOpen(false);
        handleNotify(false, "Procedimento apagado.");
      })
      .catch((error) => {
        handleNotify(true, "Erro ao apagar.");
      });
  }
  //Operador Condicional Ternário, para filtrar procedimentos.
  const filteredProcedimento = !!pesquisa ? listaProcedimentos.filter(procedimento => {
    return procedimento.descricao.toLowerCase().includes(pesquisa.toLowerCase());
  }) : listaProcedimentos;

  useEffect(() => {
    if (localStorage.getItem("empresa") === null) {
      navigate("/");
    } else {
      var empresaJson = localStorage.getItem("empresa");
      const emp = JSON.parse(empresaJson);
      setEmpresaNome(emp.nome);
    }
    loadProcedimentos();
  }, []);

  return (
    <>
      <HeaderApp nome={empresaNome}></HeaderApp>
      <ToastContainer />
      <Container fluid="md" className="justify-content-md-center container">
        <div className="d-grid gap-2">
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleClickOpenNovo}
          >
            Novo Procedimento
          </Button>
        </div>
        <br></br>
        <Box sx={{ width: 1500, maxWidth: "100%" }}>
              <TextField
                fullWidth
                label="Pesquisar procedimento"
                value={pesquisa}
                id="celular"
                onChange={(e) => {setPesquisa(e.target.value)}}
              />
            </Box>
        <Paper elevation={0} className="paperModificado">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="left">Valor</TableCell>
                  <TableCell align="left">Abrir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProcedimento.map((doc) => {
                  return (
                    <TableRow
                      key={doc.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {doc.descricao}
                      </TableCell>
                      <TableCell align="left">{doc.valor}</TableCell>
                      <TableCell align="left">
                        <OpenInNewIcon
                          onClick={() => {
                            handleClickOpen(doc);
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
                  Procedimento
                </Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deletarProcedimento(id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List sx={{ p: 1 }}>
              <ListItemButton>
                <ListItemText primary="ID" secondary={id} />
              </ListItemButton>
              <Divider />
              <br></br>
              <Box sx={{ width: 1500, maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="Descrição"
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Box>
              <br></br>
              <Box sx={{ width: 1500, maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="Valor"
                  id="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Box>
            </List>

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 1, mb: 3, ml: 1, mr: 1 }}
              onClick={() => {
                AddProcedimento();
              }}
            >
              {textoBotao}
            </Button>
          </Dialog>
        </>
      </Container>
    </>
  );
}
export default Procedimentos;
