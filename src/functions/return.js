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
