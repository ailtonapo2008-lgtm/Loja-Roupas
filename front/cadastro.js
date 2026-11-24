const API = "http://127.0.0.1:8000";
const form = document.querySelector("#form-produto");
const aviso = document.querySelector("#aviso");
const campo = (id) => document.querySelector(id).value;

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const dados = {
            tipo: campo("#tipo"),
            nome: campo("#nome").trim(),
            preco: Number(campo("#preco")),
            tamanho: campo("#tamanho")
        };

        try {
            const resposta = await fetch(`${API}/produtos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });

            const corpo = await resposta.json();

            if (!resposta.ok) {
                aviso.textContent = `Não cadastrou: ${corpo.detail}`;
                return;
            }

            aviso.textContent = `${corpo.nome} cadastrado com o número ${corpo.id}.`;
            form.reset();
        } catch (erro) {
            aviso.textContent = "Erro ao conectar com a API.";
            console.error(erro);
        }
    });
}