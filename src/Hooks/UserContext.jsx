import React from "react";
import api from "../utils/api";
import { useLocation } from "react-router-dom";

export const Contexto = React.createContext();

export const GlobalStorage = ({ children }) => {
  const local = useLocation();
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [erro, setErro] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        try {
          const res = await api.get("/usuario/conferirUsuario", user);
          setUser(res.data);
        } catch (error) {
          return error;
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } else {
        setErro("Token invalido");
      }
    };
    fetchData();
  }, [local]);

  return (
    <Contexto.Provider
      value={{ user, setUser, loading, setLoading, erro, setErro }}
    >
      {children}
    </Contexto.Provider>
  );
};
