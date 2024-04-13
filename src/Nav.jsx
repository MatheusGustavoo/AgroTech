import styles from "./nav.module.css";
import background from "../public/background imagem.png";
// import onda from "../public/onda.png";
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
        <svg
          width="120vw"
          height="926.853"
          id="screenshot-0907808a-5b07-8037-8004-319547c1130a"
          viewBox="787 269 6280 926.853"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          fill="none"
          style={{ WebkitPrintColorAdjust: "exact" }}
        >
          <g id="shape-0907808a-5b07-8037-8004-319547c1130a">
            <defs></defs>
            <g
              className={styles.fills}
              id="fills-0907808a-5b07-8037-8004-319547c1130a"
            >
              <path
                d="M787.000,366.869C787.000,366.869,1811.000,634.869,3208.000,479.869C6775.094,84.093,7067.000,366.869,7067.000,366.869L7067.000,1136.869C7067.000,1136.869,6311.000,1303.869,4744.000,1075.869C2785.452,790.898,787.000,1136.869,787.000,1136.869L787.000,366.869Z"
                style={{ fill: "#1f7354", fillOpacity: 1 }}
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
