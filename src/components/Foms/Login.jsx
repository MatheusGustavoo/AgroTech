import React from "react";
import styles from "../../style/login.module.css";
import { Button } from "./Button";
import imagem from "../../assets/login.png";
import useForm from "../../Hooks/useForm";
import useAuth from "../../Hooks/useAuth";
import { Contexto } from "../../Hooks/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../utils/Loading.jsx";

export function Login() {
  const dados = React.useContext(Contexto);
  const navigate = useNavigate();
  const rotas = useAuth();
  const email = useForm();
  const senha = useForm();
  const [usuario, setUsuario] = React.useState(null);

  function mandarUsuario(event) {
    event.preventDefault();
    setUsuario({
      email: email.valor,
      senha: senha.valor,
    });
  }
  React.useEffect(() => {
    if (!usuario) return;
    const data = rotas.entrar({ ...usuario });
  }, [usuario]);

  React.useEffect(() => {
    if (dados.user) {
      navigate("/dashboard");
    }
  }, [dados]);
  console.log(rotas.mensagem);
  return (
    <div className={styles.login}>
      {/* {dados.loading && (
        <Loading mensagem="Estamos conectando ao banco de dados, aguarde" />
      )} */}
      <h1>Login</h1>
      <p>
        Caso você ja tenha criado a conta, experimente o maximo da nossa
        aplicação.{" "}
        <Link to="/">
          <span style={{ color: "var(--cor-primaria)" }}>
            Caso não, crie uma clicando aqui
          </span>
        </Link>
      </p>
      <form onSubmit={mandarUsuario}>
        <div className={styles.loginForm}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@email.com"
            onChange={email.carregar}
            onBlur={email.validar}
          />
          <span>{email.error && <p>{email.error}</p>}</span>

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="senha"
            onChange={senha.carregar}
            onBlur={senha.validar}
          />
          <span>{senha.error && <p>{senha.error}</p>}</span>
          <span>{rotas.mensagem && <p>{rotas.mensagem}</p>}</span>
        </div>
        <Button frase="Enviar" cor="white" className={styles.button}></Button>
      </form>
      <img src={imagem} alt="" />
    </div>
  );
}
