import { useNavigate } from "react-router-dom";
import "./header.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Header() {
  const navigate = useNavigate()
  
  return (
    <div id="header">
      <p id="txtLogoH">AutoPartes</p>
      <div id="divIconsH"> 
        <i id="iconCommentH" class="fa-solid fa-comment" onClick={() => navigate("/support")}></i>
        <i id="iconConfigH" className="fa-solid fa-gear" onClick={() => navigate("/config")}></i>
      </div>
    </div>
  );
}
