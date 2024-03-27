import { toast } from "react-toastify"; 

export async function retornaBoolCriarAlgoritimo(id, email, table, tam=20) {
    try {
        const response = await fetch(
            "http://localhost:3001/api/createalgoritmo",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id, email, table, tam})
            }
        );

        if (response.ok) {
            return true
        } 
        
        return false
    } catch (e) {
        console.log(e); 
    }
}

export async function retornaCategorias() {
    try {
        const response = await fetch(
            "http://localhost:3001/api/retornacategorias",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                } 
            }
        );

        if (response.ok) {
            let data = await response.json();
            return data.categorias;
        }
    } catch (e) {
        console.log(e);
        toast.error("Erro ao carregar categorias");
    }
}

export async function retornaEstados() {
    try {
        const response = await fetch(
            "http://localhost:3001/api/retornaestados",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            let data = await response.json();
            return data.estados;
        }
    } catch (e) {
        console.log(e);
        toast.error("Erro ao carregar estados");
    }
}

export async function retornaFretes() {
    try {
        const response = await fetch(
            "http://localhost:3001/api/retornafretes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            let data = await response.json();
            return data.fretes;
        }
    } catch (e) {
        console.log(e);
        toast.error("Erro ao carregar fretes");
    }
} 

export function retornaPrecoFormatado(preco) {
    let precoVal = preco;
    if (precoVal.split(",")[1]) {
        const partes = precoVal.split(",");
        if (partes[1].length === 1) {
            return precoVal + "0";
        }
    }
    if (!precoVal.includes(",")) {
        return precoVal + ",00";
    }
    if (precoVal[precoVal.length - 1] === ",") {
        return precoVal + "00";
    }

    return precoVal;
}

export function retornaVendasFormatada(vendas) {
    if (vendas >= 100000) return "100000+";
    if (vendas >= 10000) return "10000+";
    if (vendas >= 1000) return "1000+";
    if (vendas > 100) return "100+";
    if (vendas <= 100) return vendas;
}

export function retornaSegundosConvertidos(segundos) {
    if (segundos < 60) {
      return `${segundos} segundo${segundos !== 1 ? 's' : ''}`;
    } else if (segundos < 3600) {
      const minutos = Math.floor(segundos / 60);
      return `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    } else if (segundos < 86400) {
      const horas = Math.floor(segundos / 3600);
      return `${horas} hora${horas !== 1 ? 's' : ''}`;
    } else if (segundos < 2592000) {
      const dias = Math.floor(segundos / 86400);
      return `${dias} dia${dias !== 1 ? 's' : ''}`;
    } else if (segundos < 31536000) {
      const meses = Math.floor(segundos / 2592000);
      if(meses !== 1) {
        return `${meses} meses`;
      } else {
        return `1 mês`;
      }
    } else {
      const anos = Math.floor(segundos / 31536000);
      return `${anos} ano${anos !== 1 ? 's' : ''}`;
    }
  }
  
  export function substituirPontosVirgulasIng(str) { 
    const strComVirgulas = str.replace(/\./g, ','); 
    const strFinal = strComVirgulas.replace(/,/g, '.');
  
    return strFinal;
  }

  export function substituirVirgulasPontosPort(str) { 
    const strComPontos = str.replace(/,/g, '.'); 
    const strFinal = strComPontos.replace(/\./g, ',');
  
    return strFinal;
  }