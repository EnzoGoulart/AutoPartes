import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Context } from "../../context/context";
import "./profile.css";
import ProfilePhoto from "../../imagens/profilephoto.png";
import { toast } from "react-toastify";
import { getCookie, setSessionCookie } from "../../functions/cookies";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/index";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const [novoNome, setNovoNome] = useState(user.nome);
  const [loading, setLoading] = useState(false);
  const [emailBloqueado, setEmailBloqueado] = useState("");

  const deslogarUser = () => { 
    setSessionCookie("session", '', 0)
    setUser({
      id: null,
      nome: null, 
      email: null,
      senha: null, 
      foto: undefined,
    }) 
    navigate('/')
  }

  const handleUploadButtonClick = () => {
    document.getElementById("inputFotoP").click();
  };

  const carregarFoto = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/retornaimagem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        const imagemBase64 = await response.text();
        setUser({ ...user, foto: imagemBase64 });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user.foto) {
      carregarFoto();
    }
  }, []);

  useEffect(() => {
    if (user.email && user.email.length > 7) {
      const emailNome = user.email.substring(0, 2);
      const emailDominio = user.email.substring(user.email.indexOf("@"));
      const emailAsterisco = "*".repeat(
        user.email.length - 2 - emailDominio.length
      );
      setEmailBloqueado(emailNome + emailAsterisco + emailDominio);
    } else {
      setEmailBloqueado("*@*.com");
    }
  }, []);

  async function MudarNome() {
    if (novoNome != user.nome) {
      try {
        const response = await fetch("http://localhost:3001/api/mudarNome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email, novoNome }),
        });
        console.log(response.ok)
        if (response.ok) { 
          setUser({
            ...user,
            nome: novoNome,
          });

          setSessionCookie(
            "session",
            JSON.stringify({
              senha: user.senha,
              email: user.email,
              id: user.id,
              nome: novoNome, 
            }),
            30
          );

          toast.success("Nome alterado!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.success("Nome alterado!");
    }
  }

  async function gravarFoto(e) {
    const file = e.target.files[0]; 

    try {
      const formData = new FormData();
      formData.append("file", file); 
      formData.append("email", user.email); 

      const response = await fetch(
        "http://localhost:3001/api/mudarfotoperfil",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        carregarFoto()
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar a requisição.");
    }
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div id="container">
      <Header />
      <div className="mainRolagem">
        <p id="h1P">Perfil</p>
        <img
          id="imgFotoP"
          src={user.foto ? `data:image/jpg;base64,${user.foto}` : ProfilePhoto}
        />
        <input
          id="inputFotoP"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => gravarFoto(e)}
        />
        <input
          id="inputNomeP"
          type="text"
          value={novoNome}
          onChange={(e) => {
            setNovoNome(e.target.value);
          }}
        />
        <input
          id="inputEmailP"
          type="text"
          value={emailBloqueado}
          readOnly
          disabled
        />
        <button className="btnGenericoP" onClick={handleUploadButtonClick}>
          Alterar foto
        </button>
        <button className="btnGenericoP" onClick={() => MudarNome()}>
          Alterar nome
        </button>
        <button
          className="btnGenericoP"
          onClick={() => navigate("/alterarsenha")}
        >
          Alterar senha
        </button>
        <button
          className="btnDangerP"
          onClick={() => deslogarUser()}
        >
          Deslogar
        </button>
        <div className="linha"></div>
        <button className="btnGenericoP" onClick={() => navigate("/cart")}>Ver carrinho</button>
        <div className="divUltimo">
          <button className="btnGenericoP">Ver pedidos</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
