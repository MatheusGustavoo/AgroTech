// import React from "react";
import Registrar from "../Foms/Registrar";
import styles from "../../style/home.module.css";
import { Button } from "../Foms/Button";
import { Divisor } from "../Foms/Divisor";
import historiaImg from "../../assets/historia.png";
import login from "../../assets/login.png";
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
        <div className={styles.imagem}>dadad </div>
        <Divisor />
      </div>
      <div className={`${styles.historia} div`}>
        <div className={styles.frase}>
          <h1>
            Nascemos do campo e evoluímos para atender sua fazenda de ponta a
            ponta.
          </h1>
          <p>
            AgroTech é o aplicativo de gestão rural que já está presente na
            rotina de mais de 4.700 propriedades. Ele cruza dados agrícolas,
            pecuários e financeiros de maneira assertiva, ajudando você a tomar
            decisões mais rentáveis.
          </p>
        </div>
        <div className={styles.imagem}>
          <img src={historiaImg} />
        </div>
      </div>
      <div className={`${styles.cadastrar}`}>
        <div className={styles.forms}>
          <h1>Cadastre-se</h1>
          <p>Crie sua conta gratuitamente e tenha acesso ao sistema.</p>
          <Registrar />
        </div>
        <div className={styles.imagem}>
          <img src={login} alt="" />
        </div>
      </div>
    </main>
  );
}
