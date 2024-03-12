import { useNavigate } from "react-router-dom";
import "./footer.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Footer() {
    const navigate = useNavigate()
  return (
    <div id="footer">
        <i className="fa-solid fa-plus" onClick={() => navigate('/create')} ></i>
        <i className="fa-solid fa-house" onClick={() => navigate('/home')} ></i>
        <i className="fa-solid fa-cart-shopping" onClick={() => navigate('/cart')} ></i>
        <i className="fa-regular fa-user" onClick={() => navigate('/profile')} ></i>
    </div>
  );
}
