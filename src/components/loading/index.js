import { useEffect, useState } from "react";
import "./loading.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "../header";
import Footer from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { frasesLoading } from "../../placeholder/loading";
export default function Loading() {
  const [txt, setTxt] = useState("loading...");
  useEffect(() => {
    setTimeout(() => {
      let random = Math.floor(Math.random() * frasesLoading.length);
      setTxt(frasesLoading[random]);
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
