import Footer from "../../components/footer";
import Search from "../../components/search";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import "./searchList.css";

export default function SearchList() {
    const { tipo, search } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [itens, setItens] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [mostraRanking, setMostraRanking] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSearchList();

        if(Number(tipo) === 1) {
            setMostraRanking(true)
        }

        async function getSearchList() {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3001/api/returnSearchList",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ tipo, search }),
                    }
                );

                const data = await response.json();
                setItens(data);
                console.log(data);
                let imagens = [];
                for (let i = 0; i < data.length; i++) {
                    const returnFotos = await fetch(
                        "http://localhost:3001/api/returnImagemCapa",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: data[i].id,
                            }),
                        }
                    );
                    const dataImg = await returnFotos.text();
                    imagens.push(dataImg);
                }
                setImgs(imagens);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }, [search]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Search value={search} />
            <div className="mainRolagem">
                <p className="h1AnunH">Resultados</p>
                <div className="linha" />
                <div className="divItensSL">
                    {itens.length > 0 &&
                        itens.map((item, i) => {
                            return (
                                <div
                                    className="itemSL"
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`/produto/${item.id}`)
                                    }
                                >
                                    {mostraRanking &&
                                        <div className="divRankSL">
                                            <p>#{i+1}</p>
                                        </div>}
                                    <img
                                        className="imgSL"
                                        src={`data:image/jpg;base64,${imgs[i]}`}
                                    />
                                    <div className="divTextAnun">
                                        <p className="titleAnun">
                                            {item.titulo}
                                        </p>
                                        <p className="priceAnun">
                                            R$ {item.preco}
                                        </p>
                                        <p className="freteAnun">
                                            {item.descriResumida}
                                        </p>
                                    </div>
                                </div>
                            );
                        })} 
                </div>
            </div>
            <Footer />
        </div>
    );
}
