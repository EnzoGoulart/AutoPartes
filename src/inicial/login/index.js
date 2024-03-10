import { useState } from "react";
import { Link } from "react-router-dom";
import './login.css'
import {toast} from 'react-toastify'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Logar(){
        try {
            const response = await fetch("http://localhost:3001/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, senha }),
            });
      
            if (response.ok) {
                const data = await response.json()
                if(data.login == true) {
                    
                } else if(data.login == false && data.email == true) {
                    toast.error("Senha inválida.")
                } else if(data.login == false && data.email == false) {
                    toast.error("Email inválido.")
                }
            } else {
                toast.error("Erro no servidor, tente mais tarde.") 
            }
          } catch (error) {
            toast.error("Erro no servidor, tente mais tarde.") 
          }
    }

    return (
        <div id="container">
            <div id="loginMain">
                <p id="txtLogo">AutoPartes</p>
                <p className="labelLogin">Email</p>
                <input className="inputLogin" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p className="labelLogin">Senha</p>
                <input className="inputLogin" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <button id="btnLogin" onClick={() => Logar()}>Login</button>
                <p id="cadastreLogin">Ainda não tem uma conta? <Link id="txtLink" to="/cadastro">Cadastre-se aqui</Link></p>
            </div>
        </div>
    );
}
