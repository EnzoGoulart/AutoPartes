import { useContext, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Context } from "../../context/context";
import './profile.css'
import ProfilePhoto from '../../imagens/profilephoto.png'
export default function Profile() {
    const { user, setUser } = useContext(Context);
    const [novoNome, setNovoNome] = useState(user.nome) 
 
    function mudaNome(e){
        setNovoNome(e.target.value)
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
                    <input id="inputNomeP" type="text" value={novoNome} onChange={(e) => {mudaNome(e)}}/>
                    <input id="inputEmailP" type="text" value={user.email} readonly/> 
                    <button className="btnGenericoP">Alterar senha</button>
                    <div id="linhaP"></div>
                    <button className="btnGenericoP">Ver carrinho</button>
                    <button className="btnGenericoP">Ver pedidos</button>
                </div>

            <Footer />
        </div>
    )
}