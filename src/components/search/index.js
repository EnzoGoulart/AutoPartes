import { useNavigate } from "react-router-dom";
import "./search.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useEffect, useState } from "react";
import { frasesSearch } from "../../placeholder/search";

//props.value 
//props.placeholder
export default function Search(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useState(props.value || "");
    const [placeholder, setPlaceholder] = useState(
        frasesSearch[Math.floor(Math.random() * frasesSearch.length)]
    );

    useEffect(() => {
        if (props.placeholder === "Pesquisar no vendedor") {
            setPlaceholder("Pesquisar no vendedor");
        } else {
            {
                setTimeout(() => {
                    let random = Math.floor(
                        Math.random() * frasesSearch.length
                    );
                    setPlaceholder(frasesSearch[random]);
                }, 6000);
            }
        }
    }, [placeholder, setPlaceholder]);
 
      const pesquisar = (event) => {
          if (event.key === 'Enter') {
              navigate(`/search/0/${search}`)
          }
      };

    return (
        <div id="search">
            <div id="divSearchS">
                <input
                    onKeyDown={pesquisar}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="inputS"
                    placeholder={placeholder}
                />
                <i
                    id="iconSearchS"
                    className="fa-solid fa-search"
                    onClick={pesquisar}
                ></i>
            </div>
        </div>
    );
}
