import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import { Header } from "./components/Header.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Login } from "./components/Foms/Login.jsx";
import { GlobalStorage } from "./Hooks/UserContext.jsx";
import "./style/App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </GlobalStorage>
    </BrowserRouter>
  );
}
export default App;
