export function Button(valor, onClick) {
  return (
    <button
      onClick={onClick}
      type="submit"
      style={{
        border: "none",
        width: "130px",
        // height: "40px",
        borderRadius: "20px",
        color: valor.cor,
        textAlign: "center",
        cursor: "pointer",
        padding: "0.5rem",
        boxSizing: "content-box",
      }}
    >
      {valor.frase}
    </button>
  );
}
