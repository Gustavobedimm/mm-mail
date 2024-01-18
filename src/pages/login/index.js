import { useState, useEffect } from "react";
//bootstrao
import Container from "react-bootstrap/Container";
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

function Home() {
  const [nome, setNome] = useState();
  const [celular, setCelular] = useState();
  const [telefone, setTelefone] = useState();
  const [cnpj, setCnpj] = useState();
  const [email, setEmail] = useState();
  const [endereco, setEndereco] = useState();
  const [estado, setEstado] = useState();
  const [cidade, setCidade] = useState();
  const [mensagem, setMensagem] = useState();
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
        setNome(snapshot.data().nome);
        setCelular(snapshot.data().celular);
        setTelefone(snapshot.data().telefone);
        setCnpj(snapshot.data().cnpj);
        setEmail(snapshot.data().email);
        setEndereco(snapshot.data().endereco);
        setEstado(snapshot.data().estado);
        setCidade(snapshot.data().cidade);
        setMensagem(snapshot.data().mensagem);
        setCodigo(snapshot.data().codigo);
        goInicio();
      })
      .catch((error) => {
        setNome("Empresa não encontrada.");
        console.log("Erro ao buscar post" + error);
      });
    setLoading(false);
  }

  return (
    <div className="App">
      <Container className="mt-5">
        <Card>
          <Card.Header>
            <h5>Orçar Já - Orçamentos personalizados - Login {nome}</h5>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Informe o código da sua empresa</Form.Label>
                <Form.Control type="password" placeholder="Código" onChange={(e) => setCodigo(e.target.value)}/>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="contained" onClick={buscarEmpresa}>
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
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
