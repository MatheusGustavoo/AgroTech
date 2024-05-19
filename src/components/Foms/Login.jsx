import React from "react";
import styles from "../../style/login.module.css";
import { Button } from "./Button";
import imagem from "../../assets/login.png";
import useForm from "../../Hooks/useForm";
import useAuth from "../../Hooks/useAuth";

export function Login() {
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
    console.log(usuario);
  }

  React.useEffect(() => {
    if (!usuario) return;
    const data = rotas.entrar({ ...usuario });
    console.log(data);
  }, [usuario]);
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>
        Caso você ja tenha criado a conta, experimente o maximo da nossa
        aplicação.
      </p>
      <form onSubmit={mandarUsuario}>
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
        <Button frase="Enviar" cor="white" className={styles.button}></Button>
      </form>
      <img src={imagem} alt="" />
    </div>
  );
}
