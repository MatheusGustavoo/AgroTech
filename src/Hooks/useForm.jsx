import React from "react";

const tipos = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
};
const useForms = () => {
  const [valor, mudarValor] = React.useState("");
  const [error, mudarError] = React.useState(null);
  console.log();
  function validar({ target }) {
    if (valor === "") {
      mudarError("Preencha um valor.");
    } else if (target.type === "email" && !tipos.email.regex.test(valor)) {
      mudarError(tipos.email.message);
    } else {
      mudarError(null);
    }
  }

  function carregar({ target }) {
    mudarValor(target.value);
  }

  return {
    valor,
    mudarValor,
    error,
    mudarError,
    validar,
    carregar,
  };
};

export default useForms;
