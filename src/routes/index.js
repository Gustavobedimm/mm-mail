import { Routes, Route } from "react-router-dom";
import Home from '../pages/home';
import Home2 from '../pages/homeOdonto';
import Login from '../pages/login';
import Enviados from '../pages/enviados'
import Menu from '../pages/menu'
import Perfil from '../pages/perfil'
function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/inicio2" element={<Home2 />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/enviados" element={<Enviados />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}
export default RoutesApp;