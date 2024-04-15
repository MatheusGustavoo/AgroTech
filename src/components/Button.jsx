export function Button(valor) {
  return (
    <button
      style={{
        backgroundColor: valor.bcor,
        border: "none",
        width: "130px",
        height: "40px",
        borderRadius: "20px",
        color: valor.cor,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      {valor.frase}
    </button>
  );
}
