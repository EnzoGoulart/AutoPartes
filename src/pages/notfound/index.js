import { Link } from "react-router-dom";
import "./notfound.css";

export default function NotFound() {
  return (
    <div>
      <div id="loginMain">
        <p id="txtLogo">AutoPartes</p>
        <p id="cadastreLogin">Essa página não existe!</p>
        <div>
          <button className="btnGenerico404">
            <Link id="txtLink404" to="/cadastro">
              Faça login
            </Link> 
          </button>
          <button className="btnGenerico404">
            <Link id="txtLink404" to="/">
              Cadastre-se
            </Link> 
          </button> 
          <button className="btnGenerico404">
            <Link id="txtLink404" to="/home">
              Início
            </Link> 
          </button> 
        </div>
      </div>
    </div>
  );
}
