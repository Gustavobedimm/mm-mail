
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import RoutesApp  from "./routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  );
}

export default App;
