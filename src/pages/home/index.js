//import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './index.css';
function Home() {
 
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
    <h4>Serviços</h4>
    <hr></hr>
      <Form.Check type="checkbox" label="CARGA" id="1" />
      <Form.Check type="checkbox" label="DESCARGA" id="2" />
      <Form.Check type="checkbox" label="AJUDANTES" id="3" />
      <Form.Check type="checkbox" label="MATERIAL PARA EMBALAGEM" id="4" />
      <Form.Check type="checkbox" label="EMBALAGEM DE LOUÇAS" id="5" />
      <Form.Check type="checkbox" label="EMBALAGEM DE MOVEIS" id="6" />
      <Form.Check type="checkbox" label="DESMONTAGEM DE MOVEIS" id="7" />
      <Form.Check type="checkbox" label="MONTAGEM DE MOVEIS" id="8" />
      <Form.Check type="checkbox" label="SERVIÇO DE PERSONAL ORGANIZER" id="9" />
    <h4>Localização</h4>
    <hr></hr>
      <Form.Label htmlFor="origem">Origem</Form.Label>
      <Form.Control type="text" id="input4" aria-describedby="origem"/>
      <Form.Label htmlFor="destino">Destino</Form.Label>
      <Form.Control type="text" id="input5" aria-describedby="destino"/>
    <h4>Valor do Serviço</h4>
    <hr></hr>
      <Form.Label htmlFor="total">Valor</Form.Label>
      <Form.Control type="text" id="input6" aria-describedby="total"/>


      </Form>
      </Card.Body>
    </Card>
    </Container>
        
    
    </div>
  );
}

export default Home;
