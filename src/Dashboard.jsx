import styles from "./style/dashboard.module.css";
import { Posts } from "./Posts";
import { Noticias } from "./Noticias";
import { PencilLine, ArrowLeft } from "phosphor-react";
import * as React from "react";

export function Dashboard() {
  return (
    <div className={styles.dashboard} id="dashboard">
      <nav>
        <div className={styles.user}>
          <img src="https://avatars.githubusercontent.com/u/56611686?v=4" />

          <span>Matheus</span>
          <h1>Profissão</h1>
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
      <Posts />
      {/* <Noticias /> */}
    </div>
  );
}
