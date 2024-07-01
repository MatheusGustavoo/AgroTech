import React from "react";
import Registrar from "../Foms/Registrar";
import styles from "../../style/home.module.css";
import { Divisor } from "../Foms/Divisor";
import historiaImg from "../../assets/historia.png";
import login from "../../assets/login.png";
import { Link } from "react-router-dom";

export function Home() {
  const cadastrarRef = React.useRef(null);

  const handleClick = () => {
    console.log("matheus");

    if (cadastrarRef.current) {
      cadastrarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <div className={`${styles.principal}`}>
        <div className={styles.fraseDiv}>
          <h1>O setor que promove a economia do Brasil!</h1>
          <p>
            Sua plataforma digital Agro tem tudo num só lugar: agronegócio,
            pecuária e mercado
          </p>
          <button
            onClick={handleClick}
            style={{
              border: "none",
              width: "130px",
              borderRadius: "20px",
              textAlign: "center",
              cursor: "pointer",
              padding: "0.5rem",
              boxSizing: "content-box",
              color: "white",
            }}
          >
            Cadastre-se
          </button>
        </div>
        <div className={styles.imagem}>dadad </div>
        <Divisor />
      </div>
      <div className={`${styles.historia} div`}>
        <div className={styles.frase}>
          <h1>
            Nascemos do campo e evoluímos para atender sua fazenda de ponta a
            ponta
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
      <div ref={cadastrarRef} className={`${styles.cadastrar}`} id="cadastrar">
        <div className={styles.forms}>
          <h1>Cadastre-se</h1>
          <p>Crie sua conta gratuitamente e tenha acesso ao sistema.</p>
          <Link to="/login">Caso ja possua conta, clique aqui</Link>
          <Registrar />
        </div>
        <div className={styles.imagem}>
          <img src={login} alt="" />
        </div>
      </div>
    </main>
  );
}
