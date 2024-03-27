import Footer from "../../components/footer";
import "./cart.css";
import Profile from "../../imagens/profilephoto.png";
import {
    faCartShopping,
    faClose,
    faMinus,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import Loading from "../../components/loading";
import { substituirPontosVirgulasIng, substituirVirgulasPontosPort } from "../../functions/return";
export default function Cart() {
    const { user, setUser } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);
    const [itemDeletar, setItemDeletar] = useState(-1);
    const [popup, setPopup] = useState(false);
    const [qtd, setQtd] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [itens, setItens] = useState([]);
    const [ativo, setAtivo] = useState([]);
    const [todosAtivos, setTodosAtivos] = useState(true);

    useEffect(() => {
        if (itens.length > 0) {
            let valor = 0;
            for (let i = 0; i < itens.length; i++) {
                if (Number(qtd[i]) > 0) {
                    valor +=
                        Number(substituirPontosVirgulasIng(itens[i].preco)) *
                        Number(qtd[i]);
                    if (itens[i].frete == 2) {
                        valor +=
                            Number(
                                substituirPontosVirgulasIng(itens[i].custoFrete)
                            ) * Number(qtd[i]);
                    }
                }
            }
            setValorTotal(valor.toFixed(2));
        }
    }, [itens, setItens, qtd, setQtd]);

    useEffect(() => {
        setLoading(true);
        returnCarrinho();
        setLoading(false);

        async function returnCarrinho() {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/returnCarrinho",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: user.id,
                        }),
                    }
                );

                if (response.ok) {
                    const data = await response.json();

                    setItens(data);

                    let newQtd = [];
                    let atv = [];
                    data.forEach((element) => {
                        newQtd.push(element.quantidade);
                        atv.push(true);
                    });
                    setQtd(newQtd);
                    setAtivo(atv);

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
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    function alteraQtd(e, i, id) {
        if (e < 1) {
            setItemDeletar(id);
            setPopup(true);
            return;
        }

        let arr = [...qtd];
        arr[i] = e;
        setQtd(arr);
    }

    function alteraAtivo(e, i) {
        let arr = [...ativo];
        arr[i] = e;
        setAtivo(arr);
    }

    function changeTodosAtivos(e) {
        setTodosAtivos(e);

        let arr = [...ativo];
        for (let indice = 0; indice < arr.length; indice++) {
            arr[indice] = e;
        }
        setAtivo(arr);
    }

    function fecharPopup() {
        setPopup(false);
        setItemDeletar(-1);
    }

    async function excluirItem(id) {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:3001/api/deletaRelacaoCarrinho",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idPost: id,
                        idUser: user.id,
                    }),
                }
            );
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            window.location.reload(true);
            fecharPopup();
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
        <div>
            {popup && (
                <div className="divPopupCART">
                    <div
                        onClick={() => fecharPopup()}
                        className="closeItemCART"
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <p className="txtPopupCART">Deseja excluir o item?</p>
                    <button
                        className="btnDangerP"
                        onClick={() => excluirItem(itemDeletar)}
                    >
                        Excluir
                    </button>
                    <button
                        onClick={() => fecharPopup()}
                        className="btnGenericoP"
                    >
                        Não excluir
                    </button>
                </div>
            )}

            {itens.length > 0 && (
                <div className="headerCART">
                    <input
                        type="checkbox"
                        className="checkHeaderCART"
                        checked={todosAtivos}
                        onChange={(e) => changeTodosAtivos(e.target.checked)}
                    />
                    <p className="pTodosCART">Selecionar todos</p>
                </div>
            )}

            <div className="mainRolagem minWidthCart">
                {itens.map((item, i) => {
                    return (
                        <div className="itemCART" key={item.id}>
                            <input
                                checked={ativo[i]}
                                onChange={(e) =>
                                    alteraAtivo(e.target.checked, i)
                                }
                                type="checkbox"
                                className="checkItemCART"
                            />
                            <img src={`data:image/jpg;base64,${imgs[i]}`} />
                            <div className="divInfosItemCART">
                                <p className="titleItemCart">{item.titulo}</p>
                                <p className="precoItemCART">R$ {item.preco}</p>
                                <p className="freteItemCART">
                                    {item.frete === 1
                                        ? "Frete grátis"
                                        : `+ frete: R$ ${item.custoFrete}`}
                                </p>
                                <div className="divQtdTrashItemCART">
                                    <div className="divQtdItemCART">
                                        <button
                                            onClick={() =>
                                                alteraQtd(
                                                    qtd[i] - 1,
                                                    i,
                                                    item.id
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            value={qtd[i]}
                                            onChange={(e) =>
                                                alteraQtd(
                                                    e.target.value,
                                                    i,
                                                    item.id
                                                )
                                            }
                                            className="inputQtdItemCART"
                                        />
                                        <button
                                            onClick={() =>
                                                alteraQtd(
                                                    qtd[i] + 1,
                                                    i,
                                                    item.id
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <FontAwesomeIcon
                                        onClick={() => excluirItem(item.id)}
                                        className="faTrashCART"
                                        icon={faTrash}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                {itens.length === 0 && (
                    <div className="divSemItensCART">
                        <p className="titleSemItensCART">
                            Sem itens no carrinho...
                        </p>
                        <p className="subtitleSemItensCART">
                            Clique em <FontAwesomeIcon icon={faCartShopping} />{" "}
                            dentro do anúncio de um produto para adicionar ao
                            carrinho.
                        </p>
                    </div>
                )}
            </div>

            {itens.length > 0 && (
                <div className="divDadosPagar">
                    <p className="pTotalCART">
                        Total: <b>R$ {substituirVirgulasPontosPort(String(valorTotal))}</b>
                    </p>
                    <button className="btnPagarCART">Pagar</button>
                </div>
            )}
            <Footer border={itens.length === 0 ? "12px" : "0px"} />
        </div>
    );
}
