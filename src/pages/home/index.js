import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Search from "../../components/search";
import "./home.css";
import { motion, useTransform, useMotionValue } from "framer-motion";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import profile from "../../imagens/profilephoto.png";
import { Context } from "../../context/context";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { retornaCategorias } from "../../functions/return";
export default function Home() {
    const navigate = useNavigate();
    const carousel = useRef(null);
    const carouselHis = useRef(null);
    const carouselCat = useRef(null);
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoriasImg, setCategoriasImg] = useState([]);
    const [recomendados, setRecomendados] = useState([]);
    const [recomendadosImg, setRecomendadosImg] = useState([]);
    const [historico, setHistorico] = useState([]);
    const [historicoImg, setHistoricoImg] = useState([]);
    const { user, setUser } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        selRecomendados();
        selHistorico();
        selCategorias();
        setLoading(false);

        async function selRecomendados() {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/returnHomeRecomendados",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                        }),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setRecomendados(data);
                    const imagens = [];

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
                        if (returnFotos.ok) {
                            const dataImg = await returnFotos.text();
                            imagens.push(dataImg);
                        } else {
                            console.log("Erro ao carregar imagem");
                            imagens.push(profile);
                        }
                    }

                    setRecomendadosImg(imagens);
                }
            } catch (e) {
                console.log(e);
            }
        }

        async function selHistorico() {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/returnhomehistorico",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                        }),
                    }
                );

                if (response.ok) {
                    const data = await response.json(); 
                    setHistorico(data);
                    const imagens = [];

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
                        if (returnFotos.ok) {
                            const dataImg = await returnFotos.text();
                            imagens.push(dataImg);
                        } else {
                            console.log("Erro ao carregar imagem");
                            imagens.push(profile); // Use a imagem padrão ou vazia em caso de erro
                        }
                    }

                    setHistoricoImg(imagens);
                }
            } catch (e) {
                console.log(e);
            }
        }

        async function selCategorias() {
            try {
                const cat = await retornaCategorias();
                setCategorias(cat);
                const imagens = [];

                for (let i = 0; i < cat.length; i++) {
                    const returnFotos = await fetch(
                        "http://localhost:3001/api/returnImagemCategoria",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: i }),
                        }
                    );
                    if (returnFotos.ok) {
                        const dataImg = await returnFotos.text();
                        imagens.push(dataImg);
                    } else {
                        console.log("Erro ao carregar imagem");
                        imagens.push(profile);
                    }
                }
                setCategoriasImg(imagens);
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    const carouselLeftClick = (carouselTitle = "recomendados") => {
        if (carouselTitle === "recomendados") {
            carousel.current.scrollLeft -= carousel.current.offsetWidth;
        } else if (carouselTitle === "historico") {
            carouselHis.current.scrollLeft -= carouselHis.current.offsetWidth;
        } else if (carouselTitle === "categorias") {
            carouselCat.current.scrollLeft -= carouselCat.current.offsetWidth;
        }
    };

    const carouselRightClick = (carouselTitle = "recomendados") => {
        if (carouselTitle === "recomendados") {
            carousel.current.scrollLeft += carousel.current.offsetWidth;
        } else if (carouselTitle === "historico") {
            carouselHis.current.scrollLeft += carouselHis.current.offsetWidth;
        } else if (carouselTitle === "categorias") {
            carouselCat.current.scrollLeft += carouselCat.current.offsetWidth;
        }
    };

    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    }
    return (
        <div>
            <Header border="0" />
            <Search />
            {historico.length > 0 && (
                <>
                    <div className="divAnunH">
                        <p className="h1AnunH">Histórico</p>
                        <div className="linha"></div>
                        <div className="carousel" ref={carouselHis}>
                            {historico.map((item, i) => {
                                return (
                                    <div
                                        className="item"
                                        key={item.id}
                                        onClick={() =>
                                            navigate(`/produto/${item.id}`)
                                        }
                                    >
                                        <img
                                            className="imgCarousel"
                                            src={`data:image/jpg;base64,${historicoImg[i]}`}
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
                    <div className="buttonsCarouselL">
                        <button
                            className="btnCarouselL"
                            onClick={() => carouselLeftClick("historico")}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button
                            className="btnCarouselR"
                            onClick={() => carouselRightClick("historico")}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </>
            )}

            <div className="divAnunH">
                <p className="h1AnunH">Recomendados teste</p>
                <div className="linha"></div>
                <div className="carousel" ref={carousel}>
                    {recomendados.length > 0 &&
                        recomendados.map((item, i) => {
                            return (
                                <div
                                    className="item"
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`/produto/${item.id}`)
                                    }
                                >
                                    <img
                                        className="imgCarousel"
                                        src={`data:image/jpg;base64,${recomendadosImg[i]}`}
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

            <div className="buttonsCarouselL">
                <button
                    className="btnCarouselL"
                    onClick={() => carouselLeftClick()}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                    className="btnCarouselR"
                    onClick={() => carouselRightClick()}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>

            <div className="divAnunH">
                <p className="h1AnunH">Categorias</p>
                <div className="linha"></div>
                <div className="carousel" ref={carouselCat}>
                    {categorias.length > 0 &&
                        categorias.map((item, i) => {
                            return (
                                <div
                                    className="itemCar"
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`/search/1/${item.descri}`)
                                    }
                                >
                                    <img
                                        className="imgCarouselCat"
                                        src={`data:image/jpg;base64,${categoriasImg[i]}`}
                                    />
                                    <p className="titlecat">{item.descri}</p>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className="buttonsCarouselL">
                <button
                    className="btnCarouselL"
                    onClick={() => carouselLeftClick("categorias")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                    className="btnCarouselR"
                    onClick={() => carouselRightClick("categorias")}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>

            <div className="finalHome"></div>
            <Footer />
        </div>
    );
}
