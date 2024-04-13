import styles from "./header.module.css";
import logo from "../public/LOGO.png"
export function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
      </div>
    <div >
        <ul className={styles.option}>
          <li>Nossos produtos</li>
          <li>Sobre</li>
          <li>Fale conosco</li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
}
