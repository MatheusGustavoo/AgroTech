import api from "../utils/api";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Contexto } from "../Hooks/UserContext";

export default function useAuth() {
  const navigate = useNavigate();
  const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(null);
  const [mensagem, setMensagem] = React.useState(null);

  async function registrar(user) {
    setMensagem("Estamos concetando com o banco de dados, aguarde");
    try {
      const data = await api.post("/usuario/registrar", user).then(res => {
        return res.data;
      });
      authUser(data);
      setMensagem(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      return setMensagem(error.response.data.message);
    }
  }

  async function authUser(data) {
    setUsuarioAutenticado(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    window.location.reload();
  }

  async function entrar(user) {
    setMensagem(
      "Estamos conectando você ao servidor, isso leva cerca de 1 minuto."
    );
    try {
      const data = await api.post("/usuario/entrar", user).then(res => {
        return res.data;
      });
      authUser(data);
      setMensagem(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      return setMensagem(error.response.data.message);
    }
  }

  async function sair(user) {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }
  return { sair, entrar, mensagem, usuarioAutenticado, registrar };
}
