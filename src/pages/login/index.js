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
    <div className="App">
      <Container className="mt-5">
        <Card>
          <Card.Header>
            <h5>Orçar Já - Login {nome}</h5>
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
