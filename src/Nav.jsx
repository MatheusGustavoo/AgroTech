import styles from "./nav.module.css";
import background from "../public/background imagem.png";
import onda from "../public/onda.png";
export function Nav() {
  return (
    <div className={styles.principal}>
      <div className={styles.fraseDiv}>
        <h1>O setor que promove a economia do Brasil!</h1>
        <p>
          Sua plataforma digital Agro tem tudo num só lugar: agronegócio,
          pecuaria e mercado
        </p>
      </div>
      <div className={styles.img}>
        <img src={background} alt="" />
      </div>
      <div className={styles.onda}>
        <img src={onda} className={styles.onda} alt="" />
      </div>
    </div>
  );
}
