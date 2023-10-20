import { Routes, Route } from "react-router-dom";
import Home from '../pages/home';
import Enviados from '../pages/enviados'
function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enviados" element={<Enviados />} />
    </Routes>
  );
}
export default RoutesApp;