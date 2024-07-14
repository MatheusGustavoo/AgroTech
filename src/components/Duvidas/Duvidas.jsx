import style from "../../style/duvidas.module.css";
import { Check } from "phosphor-react";
const Duvidas = () => {
  return (
    <div className={style.duvidas}>
      <div className={style.banner}>
        <h1>Nossos planos</h1>
        <h2>
          Conheça as nossos melhore produtos desenvolvido para você, e para o
          seu negócio!
        </h2>
      </div>
      <div className={style.planos}>
        <div className={style.plano}>
          <h1>Padrão</h1>
          <ul>
            <li>
              <Check size={16} color="#7da0d0" weight="bold" />
              Acesso as publicações{" "}
            </li>
            <li></li>
            <li></li>
          </ul>
          <div className={style.rodape}>
            <p>R$ 0,00</p>
            <button>Contratar</button>
          </div>
        </div>
        <div className={style.plano}>
          <h1>Basic</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          </p>
        </div>
        <div className={style.plano}>
          <h1>Plus</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          </p>
        </div>
      </div>
    </div>
  );
};

export default Duvidas;
