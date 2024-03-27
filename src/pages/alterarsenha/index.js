import { Link, useNavigate } from "react-router-dom";
import "./alterarsenha.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { toast } from "react-toastify";
import {
  Forca1,
  Forca2,
  Forca3,
  Forca4,
  Forca5,
  TxtDivSenha,
} from "../../inicial/cadastro/styledCadastro";
import { getCookie, setSessionCookie } from "../../functions/cookies";

export default function AlterarSenha() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const [novoNome, setNovoNome] = useState(user.nome);
  const [emailBloqueado, setEmailBloqueado] = useState("");
  const [cEmailAt, SetCEmailAt] = useState("");
  const [cSenhaAt, SetCSenhaAt] = useState("");
  const [cSenhaNo, SetCSenhaNo] = useState("");
  const [cSenhaCo, SetCSenhaCo] = useState("");
  const [txt, setTxt] = useState("");
  const [bar1, setBar1] = useState("");
  const [bar2, setBar2] = useState("");
  const [bar3, setBar3] = useState("");
  const [bar4, setBar4] = useState("");
  const [bar5, setBar5] = useState("");
  const [barAt, setBarAt] = useState("");

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
    SetCSenhaNo(e.target.value);
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

  useEffect(() => {
    if (user.email && user.email.length > 7) {
      const emailNome = user.email.substring(0, 2);
      const emailDominio = user.email.substring(user.email.indexOf("@"));
      const emailAsterisco = "*".repeat(
        user.email.length - 2 - emailDominio.length
      );
      setEmailBloqueado(emailNome + emailAsterisco + emailDominio);
    } else {
      setEmailBloqueado('Sem dicas disponíveis.');
    }
  }, []);

  async function SalvarAlteracao() {  
    if (cEmailAt != user.email) {
      return toast.error("Email digitado difere do logado atualmente.");
    } else if (cSenhaCo != cSenhaNo) {
      return toast.error("Senha digitada difere da confirmação.");
    } else if(cSenhaAt == cSenhaCo) {
        return toast.error("As senhas não podem ser iguais.")
    } else if(cSenhaAt.length < 6 || cSenhaCo.length < 6 || cSenhaNo.length < 6) {
        return toast.error("As senhas devem conter pelo menos 6 caracteres.")
    } 
    try {
      const response = await fetch("http://localhost:3001/api/alterarsenha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          senha: user.senha,
          cEmailAt,
          cSenhaAt,
          cSenhaCo,
          cSenhaNo,
        }),
      });
      const data = await response.json();  
      if(response.ok) { 
        if(data.resposta == -1) {
          return toast.error("Não foi possivel continuar!")
        } else if( data.resposta == 0) {
          return toast.error("Senha inválida!")
        } else if( data.resposta == 1) {  
          setUser({
            ...user,
            senha: data.senhaNova, 
          });

          let cookie = JSON.parse(getCookie("session"))
          cookie = {...cookie, senha: data.senhaNova}
          setSessionCookie(
            "session",
            JSON.stringify(cookie),
            30
          );
          navigate("/profile");
          return toast.success("Senha alterada!")
        }
      }
    } catch (e) { 
      toast.error("Erro no servidor!");
      console.log(e);
    }
  }

  return (
    <div>
      <Header />
      <div id="mainProfile">
        <p id="h1P">Alterar senha</p>

        <p className="labelAS">
          Email atual - dica: <br />
          {emailBloqueado?.length > 27
            ? emailBloqueado.substring(0, 24) + "..."
            : emailBloqueado}
        </p>
        <input
          className="inputLogin"
          type="text"
          onChange={(e) => SetCEmailAt(e.target.value)}
        />
        <p className="labelAS">Senha atual</p>
        <input
          className="inputLogin"
          type="text"
          onChange={(e) => SetCSenhaAt(e.target.value)}
        />
        <p className="labelAS">Nova senha</p>
        <input
          className="inputLogin"
          type="text"
          onChange={(e) => mudaSenha(e)}
        />
        {cSenhaNo.length > 0 && (
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
        <p className="labelAS" id="confSenhaAS">
          Confirmar senha
        </p>
        <input
          className="inputLogin"
          type="text"
          onChange={(e) => SetCSenhaCo(e.target.value)}
        />
        <button className="btnGenericoP" onClick={() => SalvarAlteracao()}>
          Salvar
        </button>
        <button className="btnGenericoP" onClick={() => navigate('/profile')}> 
            Voltar 
        </button>
      </div>
      <Footer />
    </div>
  );
}
