import styles from "../../style/dashboard.module.css";
import { Posts } from "./Posts";
import { Contexto } from "../../Hooks/UserContext.jsx";
import Error from "../../utils/Error.jsx";
import { Noticias } from "./Noticias";
import { PencilLine, ArrowLeft, SignOut } from "phosphor-react";
import React from "react";
import Loading from "../../utils/Loading.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import { Avatar } from "@mui/material";

export function Dashboard() {
  const rotas = useAuth();
  const [paginaAtiva, setPaginaAtiva] = React.useState("posts");
  const data = React.useContext(Contexto);

  if (data.erro) return <Error error={`${data.erro}`} />;
  if (!data.user) return;
  return (
    <div className={styles.dashboard} id="dashboard">
      {data.loading && <Loading />}
      <nav>
        <div className={styles.user}>
          <Avatar
            className={styles.avatar}
            // src="https://avatars.githubusercontent.com/u/56611686?v=4"
            sx={{ fontSize: 32, width: 32, height: 32 }}
          >
            {data.user?.nome[0]}
          </Avatar>
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
          <li onClick={rotas.sair}>
            Sair <SignOut size={20} color="#11402f" weight="bold" />
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
