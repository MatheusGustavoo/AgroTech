import { Check } from "phosphor-react";
import api from "../utils/api";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(null);
  const [mensagem, setMensagem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function registrar(user) {
    try {
      const data = await api.post("/usuario/registrar", user).then(res => {
        return res.data;
      });
      authUser(data);
      setMensagem(data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
      return setMensagem(error.response.data.message);
    }
  }

  async function authUser(data) {
    setUsuarioAutenticado(true);
    localStorage.setItem("token", JSON.stringify(data.token));
  }

  async function entrar(user) {
    try {
      const data = await api.post("/usuario/entrar", user).then(res => {
        return res.data;
      });
      authUser(data);
      console.log(data);
      setMensagem(data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
      return setMensagem(error.response.data.message);
    }
  }

  return { registrar, entrar, mensagem, loading, usuarioAutenticado };
}
