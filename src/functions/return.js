import { toast } from "react-toastify";

export async function retornaCategorias() {
  try {
    const response = await fetch(
      "http://localhost:3001/api/retornacategorias",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      let data = await response.json();
      return data.categorias
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
        return data.estados
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
        return data.fretes
    }
  } catch (e) {
    console.log(e);
    toast.error("Erro ao carregar fretes");
  }
}

export async function retornaImagem(tabela, coluna, pk) {
  try {
    const response = await fetch("http://localhost:3001/api/retornaimagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tabela, coluna, pk }),
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar imagem de perfil");
    } 
    const data = await response.blob()
    return data;
  } catch (error) {
    throw error;
  }
}


