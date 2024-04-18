import { Dashboard } from "./Dashboard.jsx";
import { Header } from "./Header.jsx";
import { Home } from "./Home.jsx";
import "./style/App.css";
function App() {
  return (
    <>
      <Header className="fixed" />
      {/* <Home /> */}
      <Dashboard />
    </>
  );
}
export default App;
