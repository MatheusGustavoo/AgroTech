import React from "react";
// import useAuth from "./useAuth";
import api from "../utils/api";
export const Contexto = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [user, setUser] = React.useState(0);
  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        try {
          const res = await api.get("/usuario/conferirUsuario", user);
          setUser(res.data.token);
        } catch (error) {
          return error;
        }
      }
    };
    fetchData();
  }, []);
  if (user) console.log(user);

  return (
    <Contexto.Provider value={{ user, setUser }}>{children}</Contexto.Provider>
  );
};
