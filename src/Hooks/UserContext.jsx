import React from "react";
import api from "../utils/api";
import { useLocation } from "react-router-dom";

export const Contexto = React.createContext();

export const GlobalStorage = ({ children }) => {
  const local = useLocation();
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [erro, setErro] = React.useState();
  const [token, setToken] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setToken(`Bearer ${JSON.parse(token)}`);
        try {
          const res = await api.get("/usuario/conferirUsuario");
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
        setLoading(false);
      }
    };
    fetchData();
  }, [local]);

  const contextValue = React.useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
      erro,
      setErro,
      token,
    }),
    [user, loading, erro, token]
  );

  return <Contexto.Provider value={contextValue}>{children}</Contexto.Provider>;
};
