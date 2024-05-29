export default function Error({ error }) {
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "var(--back)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Ocorreu um erro. Volte para a pagina inicial.</h1>
      <h1>{error}</h1>
    </div>
  );
}
