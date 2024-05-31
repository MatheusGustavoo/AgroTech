import styles from "../style/footer.module.css";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerOption}>
        <ul>
          <h1>Sobre a AgroTech</h1>
          <li>Quem somos?</li>
          <li>Política e privacidade</li>
        </ul>
        <ul>
          <h1>Nossos pordutos</h1>

          <li>Agronomia</li>
          <li>Pecuária</li>
        </ul>
        <ul>
          <h1>Ajuda</h1>

          <li>Dúvidas frequentes</li>
          <li>Canais de atendimento</li>
        </ul>
        <ul>
          <h1>Nossas redes sociais</h1>

          <li>Facebook</li>
          <li>Instagram</li>
        </ul>
      </div>
      <div className={styles.footerAutor}>
        © 2024 - Todos os direitos reservados - Desenvolvido por Matheus Gustavo
      </div>
    </div>
  );
}
