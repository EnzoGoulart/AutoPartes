import { useEffect, useState } from "react";
import "./loading.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "../header";
import Footer from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; 
export default function Loading() {
  const [txt, setTxt] = useState("loading...");
  useEffect(() => {
    setTimeout(() => {
      const frases = [
        "Loading smiles...",
        "Take a deep breath. We're almost there!",
        "Patience is a virtue. Thank you for waiting!",
        "Loading doses of happiness for your day!",
        "In the meantime, spread kindness around you.",
        "Does anyone really read this?",
        "Show that you know.",
        "f internet",
        "maybe in the nexts seconds",
      ];
      let random = Math.floor(Math.random() * frases.length);
      setTxt(frases[random]);
    }, 3000);
  }, [txt, setTxt]);
  return (
    <div>
      <Header />
      <div id="loading"> 
      <div id="divLoading"> 
          <FontAwesomeIcon id="spinnerLoading" icon={faSpinner} />
          <p className="lblLoading">{txt}</p> 
      </div>
      </div>
      <Footer />
    </div>
  );
}
