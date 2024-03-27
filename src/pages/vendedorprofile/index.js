import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Search from "../../components/search";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import ProfilePhoto from "../../imagens/profilephoto.png";
import Stars from "../../components/stars";
import {
    retornaSegundosConvertidos,
    retornaVendasFormatada,
} from "../../functions/return";
import "./vendedorprofile.css";
export default function VendedorProfile() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [seller, setSeller] = useState([]);
    const [sellerImg, setSellerImg] = useState([]);
    const [sellerPosts, setSellerPosts] = useState([]);
    const [postsCapa, setPostsCapa] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3001/api/retornaSellerInfos",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch seller data");
                }

                const data = await response.json();
                setSeller(data);

                const responseImg = await fetch(
                    "http://localhost:3001/api/retornaimagem",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: data.email }),
                    }
                );

                if (!responseImg.ok) {
                    throw new Error("Failed to fetch seller image");
                }

                const imageData = await responseImg.text();
                setSellerImg(imageData);

                const responseData = await fetch(
                    "http://localhost:3001/api/retornaSellerData",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id }),
                    }
                );

                if (!responseData.ok) {
                    throw new Error("Failed to fetch seller additional data");
                }

                const sellerData = await responseData.json();
                setSellerPosts(sellerData);

                const imagens = [];

                for (let i = 0; i < sellerData.length; i++) {
                    const returnFotos = await fetch(
                        "http://localhost:3001/api/returnImagemCapa",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: sellerData[i].id,
                            }),
                        }
                    );
                    if (returnFotos.ok) {
                        const dataImg = await returnFotos.text();
                        imagens.push(dataImg);
                    } else {
                        console.log("Erro ao carregar imagem");
                        imagens.push(ProfilePhoto);
                    } 
                }
                setPostsCapa(imagens);
            } catch (error) {
                console.error("Error fetching seller data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerData();
    }, []);

    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <div>
            <Search placeholder="Pesquisar no vendedor" />
            <div className="mainRolagem">
                <div className="divSellerVP">
                    <img
                        src={
                            sellerImg !== "null"
                                ? `data:image/jpg;base64,${sellerImg}`
                                : ProfilePhoto
                        }
                    />
                    <div>
                        <p>{seller.nome}</p>
                        {seller.avaliacao === 0 ? (
                            <p>Sem avaliações.</p>
                        ) : (
                            <Stars rate={seller.avaliacao} marginRight="10px" />
                        )}
                        <p>
                            {retornaVendasFormatada(seller.vendas)}{" "}
                            {retornaVendasFormatada(seller.vendas) === 1
                                ? "venda"
                                : "vendas"}
                        </p>
                        <p>
                            Há {retornaSegundosConvertidos(seller.dataCriacao)}{" "}
                            na AutoPartes
                        </p>
                    </div>
                </div>
                <div className="linha"></div>
                <p className="txtAnunVP">Anúncios</p>
                <div className="linha2"></div>
                <div className="height15"></div>
                {sellerPosts.length !== 0 ? (
                    <div className="anunsVP">
                        {sellerPosts.map((e, i) => {
                            return (
                                <div className="itemVP" key={e.id} onClick={() => navigate(`/produto/${e.id}`)}>
                                    <img src={`data:image/jpg;base64,${postsCapa[i]}`}/>
                                    <div className="divTextAnun">
                                        <p className="titleAnun">
                                            {e.titulo}
                                        </p>
                                        <p className="priceAnun">
                                            R$ {e.preco}
                                        </p>
                                        <p className="freteAnun">
                                            {e.descriResumida}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>Sem anúncios.</p>
                )}
                <div className="height15"></div>
            </div>
            <Footer />
        </div>
    );
}
