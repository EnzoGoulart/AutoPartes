import { useNavigate } from "react-router-dom";
import { getCookie } from "../functions/cookies";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";

export default function Public({ children }) {
  const { setUser } = useContext(Context);
  const navigate = useNavigate();
  const [returnFun, setReturnFun] = useState(0);

  useEffect(() => {
    let session = getCookie("session");
    if (session) {
      session = JSON.parse(session)
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/verificarLogin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: session.email }),
            }
          );

          if (response.ok) {
            const data = await response.json();
        
            if (data.login) {
              setUser({
                nome: session.nome,
                senha: data.senha,
                email: session.email,
              });
              setReturnFun(1);
            } else {
              setReturnFun(0);
            }
          } else {
            setReturnFun(0);
          }
        } catch (error) {
          console.log(error);
          setReturnFun(0);
        }
      };

      fetchData();
    } else {
      setReturnFun(0);
    }
  }, []);

  if (returnFun === 0) {
    return children;
  } else if (returnFun === 1) {
    navigate("/home");
    return null; // Evitar renderização de children se redirecionado
  }
}
