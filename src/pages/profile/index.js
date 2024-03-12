import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Context } from "../../context/context";
import './profile.css'
import ProfilePhoto from '../../imagens/profilephoto.png'
import { toast } from "react-toastify";
import { setSessionCookie } from "../../functions/cookies";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(Context);
    const [novoNome, setNovoNome] = useState(user.nome) 
    const [emailBloqueado, setEmailBloqueado] = useState('') 
 
    useEffect(() => {
        if (user.email && user.email.length > 7) {
          const emailNome = user.email.substring(0, 2);
          const emailDominio = user.email.substring(user.email.indexOf("@"));
          const emailAsterisco = "*".repeat(
            user.email.length - 2 - emailDominio.length
          );
          setEmailBloqueado(emailNome + emailAsterisco + emailDominio);
        } else {
          setEmailBloqueado('*@*.com');
        }
      }, []);
 
    async function MudarNome(){
        if(novoNome != user.nome){
            try{
                const response = await fetch("http://localhost:3001/api/mudarNome", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email, novoNome}),
                });
    
                if(response.ok) {
                    setUser({
                        ...user,
                        nome: novoNome
                    })

                    setSessionCookie(
                        "session",
                        JSON.stringify({ email: user.email, nome: novoNome, senha: user.senha }),
                        30
                      );

                    toast.success('Nome alterado!')
                }
    
            } catch(e) {
                console.log(e)
            }
        } else {
            toast.success('Nome alterado!')
        }
    }

    return(
        <div id="container">
            <Header />

                <div id="mainProfile">
                    <p id="h1P">Perfil</p>
                    {user.foto ? 
                        <img id='imgFotoP' src=""/>
                        :
                        <img id='imgFotoP' src={ProfilePhoto}/>
                    }
                    <input id="inputFotoP" type="file" accept=".png, .jpg, .jpeg"/>
                    <input id="inputNomeP" type="text" value={novoNome} onChange={(e) => {setNovoNome(e.target.value)}}/>
                    <input id="inputEmailP" type="text" value={emailBloqueado} readOnly disabled/> 
                    <button className="btnGenericoP" onClick={() => MudarNome()}>Alterar nome</button>
                    <button className="btnGenericoP" onClick={() => navigate('/alterarsenha')}>Alterar senha</button>
                    <div id="linhaP"></div>
                    <button className="btnGenericoP">Ver carrinho</button>
                    <button className="btnGenericoP">Ver pedidos</button>
                </div>

            <Footer />
        </div>
    )
}