import Logo from "../../public/animado.svg?react";
import styles from "../style/loading.module.css";

export default function Loading(mensagem) {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingAnimation}>
        <Logo />
        {mensagem ? <h1>{mensagem}</h1> : <h1>Carregando as publicações!</h1>}
      </div>
    </div>
  );
}
