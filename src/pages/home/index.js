//import { useState, useEffect } from "react";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import Api from "../../Api";
//import nodemailer from 'nodemailer';

function Home() {
  const [loading, setLoading] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Enviar E-mail");

  async function EnviarEmail() {
    setLoading(true);
    setTextoBotao("Enviando E-mail")
   const resposta = await Api.post("/send-mail");
   setTextoBotao("Enviar E-mail")
   setLoading(false);
   console.log(resposta);
  }


  return (
    <div className="App">
      <Container fluid="md" className="justify-content-md-center container">
      <Card className="mt-3">
      <Card.Header>Mudanças Mazutti - Orçamento de Serviço</Card.Header>
      <Card.Body>
    <h4>Cliente</h4>
    <hr></hr>
      <Form>
      <Form.Label htmlFor="NomeCliente">Nome do Cliente</Form.Label>
      <Form.Control type="text" id="input1" aria-describedby="NomeCliente"/>
      <Form.Label htmlFor="Doc">CPF ou CNPJ</Form.Label>
      <Form.Control type="text" id="input2" aria-describedby="Doc"/>
      <Form.Label htmlFor="Email">Email</Form.Label>
      <Form.Control type="email" id="input3" aria-describedby="Email"/>
      <br></br>
    <h4>Serviços</h4>
    <hr></hr>
      <Form.Check type="checkbox" className="checkbox" label="CARGA" id="1" />
      <Form.Check type="checkbox" className="checkbox" label="DESCARGA" id="2" />
      <Form.Check type="checkbox" className="checkbox" label="AJUDANTES" id="3" />
      <Form.Check type="checkbox" className="checkbox" label="MATERIAL PARA EMBALAGEM" id="4" />
      <Form.Check type="checkbox" className="checkbox" label="EMBALAGEM DE LOUÇAS" id="5" />
      <Form.Check type="checkbox" className="checkbox" label="EMBALAGEM DE MOVEIS" id="6" />
      <Form.Check type="checkbox"  className="checkbox" label="DESMONTAGEM DE MOVEIS" id="7" />
      <Form.Check type="checkbox" className="checkbox" label="MONTAGEM DE MOVEIS" id="8" />
      <Form.Check type="checkbox" className="checkbox" label="SERVIÇO DE PERSONAL ORGANIZER" id="9" />
      <br></br>
    <h4>Localização</h4>
    <hr></hr>
      <Form.Label htmlFor="origem">Origem</Form.Label>
      <Form.Control type="text" id="input4" aria-describedby="origem"/>
      <Form.Label htmlFor="destino">Destino</Form.Label>
      <Form.Control type="text" id="input5" aria-describedby="destino"/>
      <br></br>
    <h4>Valor do Serviço</h4>
    <hr></hr>
      <Form.Label htmlFor="total">Valor</Form.Label>
      <Form.Control type="text" id="input6" aria-describedby="total"/>
<br></br>
      <div className="d-grid gap-2">
      <Button variant="primary" size="md" onClick={EnviarEmail}>
        {loading && <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />}
        {textoBotao}
      </Button>

      


      </div>

      </Form>
      </Card.Body>
    </Card>
    <br></br>
    </Container>
        
    
    </div>
  );
}

export default Home;
