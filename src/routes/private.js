import { useNavigate } from "react-router-dom";
import { getCookie } from "../functions/cookies";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";

export default function Private({ children }) {
  const { setUser } = useContext(Context);
  const navigate = useNavigate();
  const [returnFun, setReturnFun] = useState(null);

  useEffect(() => {
    let session = getCookie("session");
    if (session) {
      session = JSON.parse(session); 
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/verificarLogin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: session.email, nome: session.nome, senha: session.senha }),
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
              setReturnFun(true);
            } else {
              setReturnFun(false);
            }
          } else {
            setReturnFun(false);
          }
        } catch (error) {
          console.log(error);
          setReturnFun(false);
        }
      };

      fetchData();
    } else {
      setReturnFun(false);
    }
  }, []); 

  useEffect(() => {
    if (returnFun !== null) {
      if (!returnFun) {
        navigate("/home");
      }
    }
  }, [returnFun, navigate]);

  return returnFun === true ? children : null;
}
