import { useContext, useEffect, useRef, useState } from "react";
import Loading from "../../components/loading";
import { useNavigate, useParams } from "react-router-dom";
import "./produto.css";
import Profile from "../../imagens/profilephoto.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Stars from "../../components/stars";
import {
    retornaBoolCriarAlgoritimo,
    retornaSegundosConvertidos,
    retornaVendasFormatada,
} from "../../functions/return";
import { Context } from "../../context/context";
import { toast } from "react-toastify";

export default function Produto() {
    const { user, setUser } = useContext(Context);
    const carousel = useRef(null);
    const navigate = useNavigate();
    const [containerImage, setContainerImage] = useState(false);
    const [imageContainer, setImageContainer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [imgAct, setImgAct] = useState(1);
    const [images, setImages] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        carregarDados();

        async function carregarDados() {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3001/api/returnProduto",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id,
                        }),
                    }
                );

                const data = await response.json();

                if (data[0]?.email !== user?.email) {
                    const created = await retornaBoolCriarAlgoritimo(
                        id,
                        user?.email,
                        "historico",
                        20
                    );
                }

                setPost(data[0]);

                const responseImgs = await fetch(
                    "http://localhost:3001/api/returnImagensProduto",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id,
                        }),
                    }
                );

                const imgs = JSON.parse(await responseImgs.text());
                const imgsMap = imgs.map((img) => img.imagem);
                setImages(imgsMap);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }, []);

    const carouselLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
        if (imgAct > 1) {
            setImgAct(imgAct - 1);
        }
    };

    const carouselRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
        if (imgAct < images.length) {
            setImgAct(imgAct + 1);
        }
    };

    function closeImage(image) {
        setContainerImage(false);
        setImageContainer(null);
    }

    function openImage(image) {
        setContainerImage(true);
        setImageContainer(image);
    }

    async function addToCart() {
        try {
            const response = await fetch(
                "http://localhost:3001/api/criaRelacionamentoCarrinho",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: user.id,
                        idPost: post.id,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();

                if (data.created) {
                    return toast.success("Adicionado ao carrinho!");
                } else {
                    return toast.info("Item já adicionado ao carrinho");
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="mainEmpty">
                {containerImage && (
                    <div
                        className="containerImage"
                        onClick={() => closeImage()}
                    >
                        <div className="closeImage">
                            <i className="fa-solid fa-solid fa-close"></i>
                        </div>
                        <img className="imageContainer" src={imageContainer} />
                    </div>
                )}

                <div id="headerPRO" onClick={() => navigate("/home")}>
                    <i className="fa-solid fa-solid fa-arrow-left"></i>
                </div>

                <div className="counterImgsPRO">
                    <p>
                        {imgAct}/{images.length}
                    </p>
                </div>

                <div className="carouselPRO" ref={carousel}>
                    {images.map((item, i) => {
                        return (
                            <div className="itemPRO" key={i}>
                                <img
                                    onClick={() =>
                                        openImage(
                                            `data:image/jpg;base64,${item}`
                                        )
                                    }
                                    src={`data:image/jpg;base64,${item}`}
                                    className="imageCPRO"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="buttonsCarouselL">
                    <button
                        className="btnCarouselL"
                        onClick={carouselLeftClick}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                        className="btnCarouselR"
                        onClick={carouselRightClick}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>

                <p className="titlePRO">{post.titulo}</p>

                <div className="linha"></div>

                <div className="infosPropPRO">
                    <p className="pricePRO">R$ {post.preco}</p>
                    <p className="divisoriaPRO">|</p>
                    {post.frete === 1 ? (
                        <p className="freteGratisPRO">Frete Grátis!</p>
                    ) : (
                        <p className="fretePRO">Frete: R$ {post.custoFrete}</p>
                    )}
                </div>

                <div className="linha"></div>

                <div className="infosPropPRO">
                    {post.avaliacao !== 0 ? (
                        <>
                            <div className="starsPRO">
                                <Stars rate={post.avaliacao} />
                            </div>

                            <p className="starsClaPRO">4,5</p>
                        </>
                    ) : (
                        <p className="starsPRO">Sem avaliações.</p>
                    )}

                    <p className="divisoriaPRO">|</p>
                    <p className="vendasPRO">
                        <b>{post.vendas}</b>{" "}
                        {post.vendas === 1 ? "vendido" : "vendidos"}
                    </p>
                </div>

                <div className="linha"></div>

                <div className="infosItemPRO">
                    <p>
                        Condição: <b>{post.estado}</b>
                    </p>
                    <p>
                        Categoria: <b>{post.categoria}</b>
                    </p>
                    <p>
                        SKU:{" "}
                        {post.sku !== "" ? <b>12345678</b> : "Não informada."}
                    </p>
                </div>

                <div className="linha"></div>

                <p className="descriTxtPRO">Descrição</p>

                <div className="descriPRO">{post.descri}</div>

                <div className="linha"></div>

                <p className="vendedorTxtPRO">Vendendor</p>

                <div
                    className="sellerProfilePRO"
                    onClick={() =>
                        navigate(`/vendedorProfile/${post.sellerId}`)
                    }
                >
                    <img src={Profile} />
                    <div className="divInfosSellerPro">
                        <p>
                            <b>{post.sellerUsername}</b>
                        </p>
                        <p>
                            {retornaVendasFormatada(post.sellerVendas)} vendas
                        </p>

                        <div className="starsSellerPRO">
                            {post.sellerAvaliacao === 0 ? (
                                <p className="semAvaliacoesSellerPRO">
                                    Sem avaliações
                                </p>
                            ) : (
                                <>
                                    <Stars
                                        rate="3.5"
                                        width="16px"
                                        marginRight="5px"
                                    />
                                    <p className="rateSellerPRO">3,5</p>
                                </>
                            )}
                        </div>
                        <p>
                            Há{" "}
                            {retornaSegundosConvertidos(post.sellerDataCriacao)}{" "}
                            na AutoPartes
                        </p>
                    </div>
                </div>

                <div className="linha"></div>

                <p className="vendedorTxtPRO">Avalições</p>

                <div className="ratePRO">
                    <img src={Profile} className="imgProfileUserPRO" />
                    <div className="divRatePRO">
                        <p className="claCliUserPRO">Cliente username</p>
                        <p className="claDesPRO">
                            asaasddsa weewfwe wetgt grreggrergerg fwfwef edwewe
                            weef wewef rwfasaasddsa weewfwe wetgt grreggrergerg
                            fwfwef edwewe weef wewef rwff wf wqedw ecwef e wef
                            ef we we efew feweweefw weffeweew fwewefew w
                        </p>
                        <div className="claImgsPRO">
                            <img
                                src={Profile}
                                onClick={() => openImage(Profile)}
                            />
                            <img
                                className="lastImgPRO"
                                src={Profile}
                                onClick={() => openImage(Profile)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {user.id !== post.sellerId && <div className="ultimoEmpty"></div>}
            {user.id === post.sellerId && <div className="cancelaUltimoEmpty"></div>}
            {user.id !== post.sellerId && (
                <div id="footerPRO">
                    <div id="footerLPRO">
                        <div onClick={() => navigate("/create")}>
                            <i className="fa-solid fa-ellipsis-v"></i>
                        </div>
                        <div onClick={() => navigate("/home")}>
                            <i className="fa-solid fa-comment"></i>
                        </div>
                        <div onClick={() => addToCart()}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>

                    <div id="footerRPRO">Comprar agora</div>
                </div>
            )}
        </>
    );
}
