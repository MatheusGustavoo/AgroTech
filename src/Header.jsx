import styles from "./style/header.module.css";
import logo from "../public/LOGO.png";
import { SignIn } from "phosphor-react";
export function Header() {
  return (
    <div className={`${styles.Header} div`}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo AgroTech" />
      </div>
      <div>
        <ul className={styles.option}>
          <li>Nossos produtos</li>
          <li>Sobre</li>
          <li>Fale conosco</li>

          <li className={styles.login}>
            login <SignIn size={18} color="#1f7354" weight="bold" />
          </li>
        </ul>
      </div>
    </div>
  );
}
