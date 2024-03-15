import Footer from "../../components/footer";
import Header from "../../components/header";
import "./dicacriarpost.css";

export default function DicaCriarPost() {
  return (
    <div>
      <Header />
      <div className="mainRolagem">
        <div className="mainDicas">
          <p className="titleDCP">
            Veja como fazer um bom anúncio para a AutoPartes!
          </p>
          <div className="linha"></div>
          <p className="subtitleDCP">Fotos</p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Boa iluminação</span>: Certifique-se de
            ter uma iluminação adequada para destacar o produto. Evite sombras
            densas ou luzes muito fortes que possam distorcer a cor e os
            detalhes.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Fundo neutro</span>: Use um fundo
            simples e neutro para que o foco principal seja no produto. Um fundo
            branco ou neutro é ideal para isso.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Foco e nitidez</span>: Mantenha o
            produto bem focado e nítido na imagem. Use a função de foco
            automático da sua câmera ou smartphone para garantir a clareza da
            foto.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Ângulos variados</span>: Tire fotos do
            produto em diferentes ângulos para mostrar todos os seus lados e
            detalhes importantes. Isso ajuda os compradores a terem uma visão
            completa do produto.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Enquadramento</span>: Use um bom
            enquadramento para destacar o produto. Evite cortar partes
            importantes ou deixar muito espaço vazio na imagem.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Tamanho adequado</span>: Redimensione a
            imagem para o tamanho recomendado pela plataforma de venda online.
            Isso garante que a imagem seja carregada rapidamente e exibida
            corretamente em diferentes dispositivos.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Limpeza e organização</span>: Antes de
            tirar a foto, certifique-se de que o produto esteja limpo e
            organizado. Remova qualquer sujeira, poeira ou detritos que possam
            prejudicar a aparência do produto na foto.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Destaque os detalhes</span>: Se o
            produto tiver detalhes importantes, como texturas, estampas ou
            características específicas, certifique-se de destacá-los nas fotos
            para atrair a atenção dos compradores.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Utilize luz natural</span>: Se
            possível, tire as fotos durante o dia e aproveite a luz natural.
            Isso geralmente produz resultados mais naturais e atraentes.
          </p>
          <p className="textoDCP">
            <span className="txtBoldDCP">Edição leve</span>: Se necessário, faça
            uma edição leve nas fotos para ajustar o brilho, contraste e cores.
            No entanto, evite editar demais para não distorcer a aparência real
            do produto.
          </p>

          <div className="paddingDCP"></div>
          <div className="linha2"></div>
          <p className="subtitleDCP">Título</p>
          <p className="textoDCP">
            Seja claro no seu título, destaque apenas o principal, evite frases
            prontas como 'em promoção' e 'para vender rápido'.
          </p>
          <p className="textoDCP">
            Exemplo de título: Som automotivo Modelo123
          </p>

          <div className="paddingDCP"></div>
          <div className="linha2"></div>
          <p className="subtitleDCP">Descrição</p>
          <p className="textoDCP">
            Seja claro e objetivo ao descrever as características principais do
            produto. Destaque os pontos fortes, como principais características
            (marca, consumo etc). Evite usar frases genéricas como "produto de
            alta qualidade" ou "excelente custo-benefício", pois não agregam
            informações específicas. Ao invés disso, foque em detalhes concretos
            que ajudem o cliente a entender o que torna o produto especial e por
            que ele deveria comprá-lo. Descreva bem o produto e aproveite as
            1500 linhas!
          </p>

          <div className="paddingDCP"></div>
          <div className="linha2"></div>
          <p className="subtitleDCP">Cor</p>
          <p className="textoDCP">
            Diga as cores presentes no produto, de preferência ordenada pela
            mais ocorrente até a menos ocorrente.
          </p>

          <div className="paddingDCP"></div>
          <div className="linha3"></div> 
          <p className="finalDCP">
            Agora você está apto para fazer um ótimo anúncio!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
