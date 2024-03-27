import { useNavigate } from "react-router-dom";
import "./header.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Header(props) {
  const navigate = useNavigate()
  const border = props?.border ? "0px" : "12px"

  return (
    <div id="header" style={{borderBottomLeftRadius: border, borderBottomRightRadius: border}}>
      <p id="txtLogoH">AutoPartes</p>
      <div id="divIconsH"> 
        <i id="iconCommentH" className="fa-solid fa-comment" onClick={() => navigate("/support")}></i>
        <i id="iconConfigH" className="fa-solid fa-gear" onClick={() => navigate("/config")}></i>
      </div>
    </div>
  );
}
