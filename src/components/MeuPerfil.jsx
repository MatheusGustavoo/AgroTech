import React from "react";
import { Contexto } from "../Hooks/UserContext.jsx";
import Error from "../utils/Error.jsx";
import style from "../style/meuPerfil.module.css";
import { Link } from "react-router-dom";
import { SignOut, ChartLine } from "phosphor-react";
import api from "../utils/api.jsx";
export function MeuPerfil() {
  const [meusPosts, setMeusPosts] = React.useState();
  const data = React.useContext(Contexto);
  async function carregarMeusPosts() {
    try {
      const fetch = await api
        .get("/post/meusPosts", {
          headers: {
            Authorization: data.token,
            "Content-Type": "application/json",
          },
        })
        .then(res => res.data);
      setMeusPosts(fetch);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (!data.token) {
      return;
    }
    carregarMeusPosts();
  }, [data.token]);
  if (!data.user) {
    return <Error />;
  }
  return (
    <div className={style.meuPerfil}>
      <div className={style.user}>
        <h1 className={style.userNome}>Minha conta</h1>

        <Link to="/dashboard" className={style.estatistica}>
          <ChartLine size={32} />
        </Link>
        <Link to="/" className={style.sair}>
          <SignOut size={32} />
        </Link>
      </div>
      <div className={style.meuConteudo}>
        {meusPosts &&
          meusPosts.map(post => (
            <div key={post.id} className={style.post}>
              <img src={post.imagem} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
