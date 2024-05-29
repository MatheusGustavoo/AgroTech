import React from "react";
import useForms from "../../Hooks/useForm";
import useAuth from "../../Hooks/useAuth";
import { Button } from "./Button";
import styles from "../../style/registrar.module.css";

export default function Resgistrar() {
  const rotas = useAuth();
  const nomeDoUsuario = useForms();
  const senha = useForms();
  const email = useForms();
  const telefone = useForms();
  const profissao = useForms();
  const [usuario, setUsuario] = React.useState(null);
  const [resError, setResError] = React.useState(null);

  function mandarUsuario(event) {
    event.preventDefault();
    setUsuario({
      nome: nomeDoUsuario.valor,
      email: email.valor,
      senha: senha.valor,
      telefone: telefone.valor,
      profissao: profissao.valor,
    });
    console.log(usuario);
  }
  React.useEffect(() => {
    if (!usuario) return;
    rotas.registrar({ ...usuario });
  }, [usuario]);

  React.useEffect(() => {
    if (!rotas.mensagem) return;
    setResError(rotas.mensagem);
  }, [rotas.mensagem]);

  return (
    <div className={styles.registrar}>
      <form onSubmit={mandarUsuario}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          onChange={nomeDoUsuario.carregar}
          onBlur={nomeDoUsuario.validar}
        />
        {nomeDoUsuario.error && <p>{nomeDoUsuario.error}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={email.carregar}
          onBlur={email.validar}
        />
        <span>{email.error && <p>{email.error}</p>}</span>

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          onChange={senha.carregar}
          onBlur={senha.validar}
        />
        <span>{senha.error && <p>{senha.error}</p>}</span>

        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          onChange={telefone.carregar}
          onBlur={telefone.validar}
        />
        <span>{telefone.error && <p>{telefone.error}</p>}</span>

        <label htmlFor="profissao">Profissão</label>
        <select
          id="profissao"
          defaultValue="selecione"
          name="profissao"
          onChange={profissao.carregar}
        >
          <option value="selecione" disabled>
            Selecione
          </option>
          <option value="Agronomo">Engenheiro agrônomo</option>
          <option value="Agricultor">Agricultor</option>
          <option value="Veterinario">Veterinario</option>
        </select>

        <span> {profissao.error && <p>{profissao.error}</p>}</span>
        {resError && <p>{resError}</p>}
        <Button frase="Enviar" cor="white" className={styles.button}></Button>
      </form>
    </div>
  );
}
