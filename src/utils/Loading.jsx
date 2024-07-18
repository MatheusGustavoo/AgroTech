import Logo from "../../public/animado.svg?react";
import styles from "../style/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingAnimation}>
        <Logo />
        <h1>Carregando as publicações!</h1>
      </div>
    </div>
  );
}
