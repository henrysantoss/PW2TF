import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/homeForm.jsx";
import Login from "./components/loginForm.jsx";
import CriarTeste from "./components/criarTesteForm.jsx";
import ListaTestes from "./components/listaTestesForm.jsx";
import Teste from "./components/teste.jsx";
import Resultados from "./components/resultados.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criarteste" element={<CriarTeste />} />
        <Route path="/listatestes" element={<ListaTestes />} />
        <Route path="/teste/:idTeste" element={<Teste />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </Router>
  );
}

export default App;
