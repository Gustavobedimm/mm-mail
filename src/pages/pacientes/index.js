import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import HeaderApp from "../../components/headerApp";
import { useNavigate } from "react-router-dom";

function Pacientes(){
    const [empresaNome, setEmpresaNome] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem("empresa") === null) {
          navigate("/");
        } else {
          var empresaJson = localStorage.getItem("empresa");
          const emp = JSON.parse(empresaJson);
          setEmpresaNome(emp.nome);
        }
      }, []);


    return(
        <>
        <HeaderApp nome={empresaNome}></HeaderApp>
        <Container fluid="md" className="justify-content-md-center container">

        </Container>
        </>

    );
}
export default Pacientes;