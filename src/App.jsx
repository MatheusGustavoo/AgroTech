import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import { Header } from "./components/Header.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Login } from "./components/Foms/Login.jsx";
import Footer from "./components/Footer.jsx";
import Error from "./utils/Error.jsx";
import { GlobalStorage } from "./Hooks/UserContext.jsx";
import "./style/App.css";
import { MeuPerfil } from "./components/MeuPerfil.jsx";
import Produtos from "./components/Produtos/Produtos.jsx";
import Duvidas from "./components/Duvidas/Duvidas.jsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meuPerfil" element={<MeuPerfil />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/duvidas" element={<Duvidas />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </GlobalStorage>
    </BrowserRouter>
  );
}
export default App;
