import "./criarpost.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import Plus from "../../imagens/plus.png";
import { toast } from "react-toastify";
import { retornaCategorias, retornaEstados } from "../../functions/return";
import Loading from "../../components/loading";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CriarPost() {
  const navigate = useNavigate();
  const [titlePost, setTitlePost] = useState("");
  const [corPost, setCorPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [descriPost, setDescriPost] = useState("");
  const [images, setImages] = useState([]);
  const [catSel, setCatSel] = useState('');
  const [conSel, setConSel] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    defStates();
    async function defStates() {
      let selCat = await retornaCategorias();
      selCat.shift();
      setCategorias(selCat);
      setEstados(await retornaEstados());
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
    }
  };

  function mudaImages(index) {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  async function cadastrarPost() {
    if (images.length == 0) {
      return toast.error("Nenhuma imagem cadastrada!");
    } else if (images.length > 4) {
      return toast.error("Limite de 4 imagens!");
    } else if (titlePost.length > 90) {
    } else if (0 >= titlePost.length) {
      return toast.error("Título vazio!");
    } else if (titlePost.length > 90) {
      return toast.error("Título excedeu o limite de caracteres!");
    } else if (0 >= descriPost.length) {
      return toast.error("Descrição vazia!");
    } else if (descriPost.length > 1500) {
      return toast.error("Descrição excedeu o limite de caracteres!");
    } else if (0 >= corPost.length) {
      return toast.error("Sem cores cadastradas!");
    } else if (corPost.length > 90) {
      return toast.error("Campo cor excedeu o limite de caracteres!");
    }

    try{  
      const response = await fetch("http://localhost:3001/api/alte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          senha: user.senha,
          images,
          titlePost,
          descriPost,
          corPost,
          corPost,
          corPost,
          corPost,
        }),
      });
    } catch(e) {
      toast.error("Erro inesperado!");
      console.log(e)
    }
    return toast.success("suceso");
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
      <div className="mainRolagem">
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
                onChange={handleFileChange}
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            ) : (
              <div className="divTrashCP" onClick={() => mudaImages(0)}>
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
                onChange={handleFileChange}
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            ) : (
              <div className="divTrashCP" onClick={() => mudaImages(1)}>
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
                onChange={handleFileChange}
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            ) : (
              <div className="divTrashCP" onClick={() => mudaImages(2)}>
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
                onChange={handleFileChange}
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            ) : (
              <div className="divTrashCP" onClick={() => mudaImages(3)}>
                <FontAwesomeIcon className="trashCP" icon={faTrash} />
              </div>
            )}
          </div>
        </div>

        <p className="lblTxtCP">Título - {titlePost.length}/90</p>
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
        <p className="lblTxtCP">Cor - {corPost.length}/90</p>
        <textarea
          className="inputCP"
          value={corPost}
          onChange={(e) => setCorPost(e.target.value)}
        />

        <p className="lblDesCP">Categoria</p>
        <select className="selCP" id="selectCategoriaCP" onChange={e=>setCatSel(e.target.value)}>
          {categorias.map((cat) => (
            <option key={cat.id}>{cat.descri}</option>
          ))}
        </select>
        <p className="lblDesCP">Condição</p>
        <select className="selCP" id="selectCondicaoCP" onChange={e=>setConSel(e.target.value)}>
          {estados.map((cat) => (
            <option key={cat.id}>{cat.descri}</option>
          ))}
        </select>
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
