import "./criarpost.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import Plus from "../../imagens/plus.png";
import { toast } from "react-toastify";
import {
    retornaCategorias,
    retornaDataMysql,
    retornaEstados,
    retornaFretes,
} from "../../functions/return";
import Loading from "../../components/loading";
import { faLightbulb, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CriarPost() {
    const navigate = useNavigate();
    const [titlePost, setTitlePost] = useState("");
    const [corPost, setCorPost] = useState("");
    const [precoPost, setPrecoPost] = useState("");
    const [skuPost, setSkuPost] = useState("");
    const [loading, setLoading] = useState(true);
    const [descriPost, setDescriPost] = useState("");
    const [images, setImages] = useState([]);
    const [image0, setImage0] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [precoFreteSel, setPrecoFreteSel] = useState("");
    const [image3, setImage3] = useState("");
    const [catSel, setCatSel] = useState(2);
    const [conSel, setConSel] = useState(1);
    const [freSel, setFreSel] = useState(1);
    const [categorias, setCategorias] = useState([]);
    const [estados, setEstados] = useState([]);
    const [fretes, setFretes] = useState([]);
    const { user, setUser } = useContext(Context);

    useEffect(() => {
        defStates();
        async function defStates() {
            let selCat = await retornaCategorias();
            selCat.shift();
            setCategorias(selCat);
            setEstados(await retornaEstados());
            setFretes(await retornaFretes());
            setLoading(false);
        }
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, reader.result]);
            };
            reader.readAsDataURL(file);

            if (image0 === "") {
                setImage0(file);
            } else if (image1 === "") {
                setImage1(file);
            } else if (image2 === "") {
                setImage2(file);
            } else {
                setImage3(file);
            }
        }
    };

    function mudaImages(index) {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        if (index === 0 && image1 !== "") {
            setImage0(image1);
            setImage1(image2 !== "" ? image2 : "");
            setImage2(image3 !== "" ? image3 : "");
            setImage3("");
        } else if (index === 1 && image2 !== "") {
            setImage1(image2);
            setImage2(image3 !== "" ? image3 : "");
            setImage3("");
        } else if (index === 2 && image3 !== "") {
            setImage2(image3);
            setImage3("");
        } else if (index === 3) {
            setImage3("");
        }
    }

    function validarSKU(sku) {
        const regex = /^[A-Z0-9-]+$/;
        if (!regex.test(sku) || sku.length !== 8) {
            return false;
        }

        return true;
    }

    const handlePrecoChange = (e, set) => {
        let valor = e.target.value.replace(/[^\d\,]/g, "");
        if (valor.includes(",")) {
            const partes = valor.split(",");

            if (partes[1].length === 3 || partes[0].length === 7) {
                return valor;
            }
        } else if (valor.length === 7 && valor[-1] != ",") {
            return valor;
        }

        if (set === "preco") {
            setPrecoPost(validarPreco(valor));
        } else if (set === "frete") {
            setPrecoFreteSel(validarPreco(valor));
        }
    };

    function validarPreco(valor) {
        let numeroString = valor.toString();
        let partes = numeroString.split(".");
        let parteInteira = partes[0];
        parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parteInteira;
    }

    async function cadastrarPost() {  
        if (images.length == 0) {
            return toast.error("Nenhuma imagem cadastrada!");
        } else if (images.length > 4) {
            return toast.error("Limite de 4 imagens!");
        } else if (0 >= titlePost.length) {
            return toast.error("Título vazio!");
        } else if (titlePost.length > 120) {
            return toast.error("Título excedeu o limite de caracteres!");
        } else if (0 >= descriPost.length) {
            return toast.error("Descrição vazia!");
        } else if (descriPost.length > 1500) {
            return toast.error("Descrição excedeu o limite de caracteres!");
        } else if (0 >= corPost.length) {
            return toast.error("Sem cores cadastradas!");
        } else if (corPost.length > 90) {
            return toast.error("Campo cor excedeu o limite de caracteres!");
        } else if (!validarSKU(skuPost) && skuPost != "") {
            return toast.error("SKU inválido!");
        } else if (precoPost === "" || precoPost === ",") {
            return toast.error("Preço não digitado!");
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file0", image0);
            if (image1) {
                formData.append("file1", image1);
            }
            if (image2) {
                formData.append("file2", image2);
            }
            if (image3) {
                formData.append("file3", image3);
            }

            formData.append("titlePost", titlePost);
            formData.append("descriPost", descriPost);
            formData.append("corPost", corPost);
            formData.append("skuPost", skuPost);
            formData.append("catSel", catSel);
            formData.append("conSel", conSel);
            formData.append("freSel", freSel);
            formData.append("precoPost", precoPost);
            formData.append("precoFreteSel", precoFreteSel);
            formData.append("email", user.email);

            const response = await fetch(
                "http://localhost:3001/api/createpostitem",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                //navigate("/meusposts");
                return toast.success("Post criado!");
            }
        } catch (e) {
            toast.error("Erro inesperado!");
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }
    return (
        <div id="container">
            <Header />
            <a id="dicascreate" href="/dicas/create" target="_blank"></a>
            <div className="mainRolagem">
                <div className="divDebugBtnCP">
                    <button
                        onClick={() =>
                            document.getElementById("dicascreate").click()
                        }
                        className="btnHintCP"
                    >
                        <FontAwesomeIcon
                            className="hintCP"
                            icon={faLightbulb}
                        />{" "}
                        Como fazer um bom anúncio?
                    </button>
                </div>

                <p className="lblCP">Adicionar imagens - {images.length}/4</p>

                <div className="divImgsCP">
                    <div className="divImgCP">
                        <img className="imgCP" src={images[0] || Plus} />
                        <img className="imgCP" src={images[1] || Plus} />
                    </div>
                    <div className="divImgCP">
                        <img className="imgCP" src={images[2] || Plus} />
                        <img className="imgCP" src={images[3] || Plus} />
                    </div>
                </div>

                <div className="divInputsCP">
                    <div className="divInputImgCP">
                        {!images[0] ? (
                            <input
                                className="inputImgCP"
                                onChange={(e) => handleFileChange(e)}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                            />
                        ) : (
                            <div
                                className="divTrashCP"
                                onClick={() => mudaImages(0)}
                            >
                                <FontAwesomeIcon
                                    className="trashCP"
                                    onClick={() => mudaImages(0)}
                                    icon={faTrash}
                                />
                            </div>
                        )}

                        {!images[1] ? (
                            <input
                                className="inputImgCP"
                                onChange={(e) => handleFileChange(e)}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                            />
                        ) : (
                            <div
                                className="divTrashCP"
                                onClick={() => mudaImages(1)}
                            >
                                <FontAwesomeIcon
                                    className="trashCP"
                                    onClick={() => mudaImages(1)}
                                    icon={faTrash}
                                />
                            </div>
                        )}
                    </div>
                    <div className="divInputImgCP">
                        {!images[2] ? (
                            <input
                                className="inputImgCP"
                                onChange={(e) => handleFileChange(e)}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                            />
                        ) : (
                            <div
                                className="divTrashCP"
                                onClick={() => mudaImages(2)}
                            >
                                <FontAwesomeIcon
                                    className="trashCP"
                                    onClick={() => mudaImages(2)}
                                    icon={faTrash}
                                />
                            </div>
                        )}

                        {!images[3] ? (
                            <input
                                className="inputImgCP"
                                onChange={(e) => handleFileChange(e)}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                            />
                        ) : (
                            <div
                                className="divTrashCP"
                                onClick={() => mudaImages(3)}
                            >
                                <FontAwesomeIcon
                                    className="trashCP"
                                    icon={faTrash}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <p className="lblTxtCP">Título - {titlePost.length}/120</p>
                <textarea
                    className="inputCP"
                    value={titlePost}
                    onChange={(e) => setTitlePost(e.target.value)}
                />

                <p className="lblDesCP">Descrição - {descriPost.length}/1500</p>
                <textarea
                    className="descriCP"
                    value={descriPost}
                    onChange={(e) => setDescriPost(e.target.value)}
                />

                <p className="lblTxtCP">Preço - Formato: 10.125,10</p>
                <textarea
                    className="inputCP"
                    value={precoPost}
                    onChange={(e) => handlePrecoChange(e, "preco")}
                />

                <p className="lblTxtCP">Cor - {corPost.length}/90</p>
                <textarea
                    className="inputCP"
                    value={corPost}
                    onChange={(e) => setCorPost(e.target.value)}
                />

                <p className="lblTxtCP">SKU (opcional)</p>
                <textarea
                    className="inputCP"
                    value={skuPost}
                    onChange={(e) => setSkuPost(e.target.value)}
                />

                <p className="lblDesCP">Categoria</p>
                <select
                    className="selCP"
                    id="selectCategoriaCP"
                    onChange={(e) => setCatSel(e.target.value)}
                >
                    {categorias.map((cat) => (
                        <option value={cat.id} key={cat.id}>
                            {cat.descri}
                        </option>
                    ))}
                </select>
                <p className="lblDesCP">Condição</p>
                <select
                    className="selCP"
                    id="selectCondicaoCP"
                    onChange={(e) => setConSel(e.target.value)}
                >
                    {estados.map((cat) => (
                        <option value={cat.id} key={cat.id}>
                            {cat.descri}
                        </option>
                    ))}
                </select>
                <p className="lblDesCP">Frete</p>
                <select
                    className="selCP"
                    id="selectCondicaoCP"
                    onChange={(e) => setFreSel(e.target.value)}
                >
                    {fretes.map((cat) => (
                        <option value={cat.id} key={cat.id}>
                            {cat.descri}
                        </option>
                    ))}
                </select>
                {freSel === "2" && (
                    <div>
                        <p className="lblDesCP">Preço do frete pago</p>
                        <textarea
                            className="inputCP"
                            value={precoFreteSel}
                            onChange={(e) => handlePrecoChange(e, "frete")}
                        />
                    </div>
                )}
                <div id="divBtnCadCP">
                    <button id="btnCadCP" onClick={() => cadastrarPost()}>
                        Cadastrar
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
