import styles from "../../style/dashboard.module.css";
import { Posts } from "./Posts";
import { Contexto } from "../../Hooks/UserContext.jsx";
import Error from "../../utils/Error.jsx";
import { Noticias } from "./Noticias";
import { PencilLine, ArrowLeft } from "phosphor-react";
import React from "react";
import Loading from "../../utils/Loading.jsx";

export function Dashboard() {
  const [paginaAtiva, setPaginaAtiva] = React.useState("posts");
  const data = React.useContext(Contexto);
  if (data.erro) return <Error error={`${data.erro}`} />;

  if (!data.user) return;
  console.log(paginaAtiva);
  return (
    <div className={styles.dashboard} id="dashboard">
      {data.loading && <Loading />}
      <nav>
        <div className={styles.user}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />
          <span>{data.user.nome}</span>
          <h1>{data.user.profissao}</h1>
          <footer>
            <button>
              EDITAR PERFIL <PencilLine size={16} color="#b1e6dc" />
            </button>
          </footer>
        </div>
        <ul>
          <li>
            Meu perfil
            <ArrowLeft size={18} weight="bold" />
          </li>
          <li>
            Estatisticas <ArrowLeft size={18} weight="bold" />
          </li>
          <li>
            Configuração <ArrowLeft size={18} weight="bold" />
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <button
          onClick={() => setPaginaAtiva("posts")}
          {...(paginaAtiva === "noticias" && { className: styles.ativo })}
        >
          Posts
        </button>
        <button
          onClick={() => setPaginaAtiva("noticias")}
          {...(paginaAtiva === "posts" && { className: styles.ativo })}
        >
          Noticias
        </button>
        {paginaAtiva === "posts" && <Posts />}
        {paginaAtiva === "posts" && <Noticias />}
      </main>
    </div>
  );
}
