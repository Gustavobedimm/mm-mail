import { Routes, Route } from "react-router-dom";
import Home from '../pages/home';
import Login from '../pages/login';
import Enviados from '../pages/enviados'
function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/enviados" element={<Enviados />} />
    </Routes>
  );
}
export default RoutesApp;