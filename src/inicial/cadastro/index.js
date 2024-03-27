import "./cadastro.css";
import "../login/login.css";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Forca1,
  Forca2,
  Forca3,
  Forca4,
  Forca5,
  TxtDivSenha,
} from "./styledCadastro";
import { Context } from "../../context/context";
import { setSessionCookie } from "../../functions/cookies";
export default function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [txt, setTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [bar1, setBar1] = useState("");
  const [bar2, setBar2] = useState("");
  const [bar3, setBar3] = useState("");
  const [bar4, setBar4] = useState("");
  const [bar5, setBar5] = useState("");
  const [barAt, setBarAt] = useState("");
  const { user, setUser } = useContext(Context);

  function VerificarSenha(senha) {
    const length = senha.length;
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(senha);
    const hasUpperCase = /[A-Z]/.test(senha);

    if (length < 6) {
      return [false, "Inválido - Pelo menos 6 caracteres"];
    } else if (hasSpecialChar && hasUpperCase) {
      return [true, "Muito forte"];
    } else if (length >= 6 && !hasSpecialChar && !hasUpperCase) {
      return [true, "Fraco"];
    } else if (
      (length >= 8 && hasSpecialChar) ||
      (length >= 8 && hasUpperCase)
    ) {
      return [true, "Forte"];
    } else if (length >= 6 && length < 8 && (hasSpecialChar || hasUpperCase)) {
      return [true, "Pode melhorar"];
    }
    return [false, "Inválido - Pelo menos 6 caracteres"];
  }
  async function mudaSenha(e) {
    setSenha(e.target.value);
    let senhaa = e.target.value;
    let rank = VerificarSenha(senhaa);
    rank = rank[1];
    setTxt(rank);
    if (rank === "Inválido - Pelo menos 6 caracteres") {
      setBar1("#FF6868");
      setBar2("#fff");
      setBar3("#fff");
      setBar4("#fff");
      setBar5("#fff");
      setBarAt("#FF6868");
    } else if (rank === "Fraco") {
      setBar1("#fff");
      setBar2("#FA933A");
      setBar3("#fff");
      setBar4("#fff");
      setBar5("#fff");
      setBarAt("#FA933A");
    } else if (rank === "Pode melhorar") {
      setBar1("#fff");
      setBar2("#fff");
      setBar3("#FACD3C");
      setBar4("#fff");
      setBar5("#fff");
      setBarAt("#FACD3C");
    } else if (rank === "Forte") {
      setBar1("#fff");
      setBar2("#fff");
      setBar3("#fff");
      setBar4("#BDD63C");
      setBar5("#fff");
      setBarAt("#BDD63C");
    } else if (rank === "Muito forte") {
      setBar1("#fff");
      setBar2("#fff");
      setBar3("#fff");
      setBar4("#fff");
      setBar5("#4AF022");
      setBarAt("#4AF022");
    }
  }
  async function Cadastrar() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailValid = true;
    if (!regex.test(email)) {
      emailValid = false;
    }
    if (
      !emailValid ||
      nome.length < 4 ||
      senha.length < 6 ||
      senha.length > 20
    ) {
      if (nome.length < 4) {
        return toast.error("Nome deve conter pelo menos 4 caracteres");
      }
      if (!emailValid) {
        return toast.error("Email inválido!");
      }
      if (senha.length < 6) {
        return toast.error("Senha muito pequena!");
      }
      if (senha.length > 20) {
        return toast.error("Senha não pode conter mais de 20 caracteres!");
      }
      return toast.error("Há dados inválidos, corrija-os");
    }

    try {
      const response = await fetch("http://localhost:3001/api/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha, nome }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.created == true) {
          toast.success("Cadastrado com sucesso!");
          setUser({
            ...user,
            nome,
            senha,
            email,
            id: data.id
          });
          setSessionCookie(
            "session",
            JSON.stringify({ id: data.id, email, nome, senha: data.senha }),
            30
          );
          navigate("/home");
        } else if (data.created == false && data.jaExiste == true) {
          toast.error("Usuário já cadastrado, faça login!");
        } else if (data.created == false && data.jaExiste == false) {
          toast.error("Erro no servidor, tente mais tarde.");
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
        <p className="labelLogin">Nome</p>
        <input
          className="inputLogin"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
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
          onChange={(e) => mudaSenha(e)}
        />
        {senha.length > 0 && (
          <div id="divSenhaL">
            <TxtDivSenha color={barAt}>{txt}</TxtDivSenha>
            <div id="divForcaL">
              <Forca1 bgcolor={bar1} className="forcaL"></Forca1>
              <Forca2 bgcolor={bar2} className="forcaL"></Forca2>
              <Forca3 bgcolor={bar3} className="forcaL"></Forca3>
              <Forca4 bgcolor={bar4} className="forcaL"></Forca4>
              <Forca5 bgcolor={bar5} className="forcaL"></Forca5>
            </div>
          </div>
        )}
        <button id="btnLogin" onClick={() => Cadastrar()}>
          Cadastrar
        </button>
        <p id="cadastreLogin">
          Já tem uma conta?{" "}
          <Link id="txtLink" to="/">
            Faça o login!
          </Link>
        </p>
      </div>
    </div>
  );
}
