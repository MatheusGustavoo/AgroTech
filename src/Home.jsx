import styles from "./style/home.module.css";
import background from "../public/background imagem.png";
import { Button } from "./components/Button";
import { Divisor } from "./components/Divisor";
export function Home() {
  return (
    <main>
      <div className={`${styles.principal}`}>
        <div className={styles.fraseDiv}>
          <h1>O setor que promove a economia do Brasil!</h1>
          <p>
            Sua plataforma digital Agro tem tudo num só lugar: agronegócio,
            pecuaria e mercado
          </p>
          <Button
            frase="Cadastre-se"
            bcor="var(--verde-logo-escuro)"
            cor="white"
          />
        </div>
        <div className={styles.imagem}>
          <img src={background} alt="" />
        </div>
      </div>
      <Divisor />
    </main>
  );
}
