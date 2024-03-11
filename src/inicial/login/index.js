import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import { Context } from "../../context/context";
import { getCookie, setSessionCookie } from "../../functions/cookies";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { user, setUser } = useContext(Context);

  async function Logar() {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.login == true) {
          setUser({
            nome: data.nome,
            senha,
            email,
          });
          setSessionCookie(
            "session",
            JSON.stringify({ email, nome: data.nome }),
            30
          );
          navigate("/home");
        } else if (data.login == false && data.email == true) {
          toast.error("Senha inválida!");
        } else if (data.login == false && data.email == false) {
          toast.error("Email inválido!");
        }
      } else {
        toast.error("Erro no servidor, tente mais tarde.");
      }
    } catch (error) {
      toast.error("Erro no servidor, tente mais tarde.");
    }
  }
 
  return (
    <div id="container">
      <div id="loginMain">
        <p id="txtLogo">AutoPartes</p>
        <p className="labelLogin">Email</p>
        <input
          className="inputLogin"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="labelLogin">Senha</p>
        <input
          className="inputLogin"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button id="btnLogin" onClick={() => Logar()}>
          Login
        </button>
        <p id="cadastreLogin">
          Ainda não tem uma conta?{" "}
          <Link id="txtLink" to="/cadastro">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
