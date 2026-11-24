const API = "http://127.0.0.1:8000";
let produtos = [];

const vitrine = document.querySelector("#vitrine");
const busca = document.querySelector("#busca");
const estado = document.querySelector("#estado");

function montarCard(p) {
    const art = document.createElement("article");
    art.className = "produto";
    art.innerHTML = `
        <h3>${p.nome}</h3>
        <p>Tamanho ${p.tamanho}</p>
        <p><strong>R$ ${p.preco.toFixed(2)}</strong></p>
    `;
    return art;
}

function desenhar(lista) {
    if (!vitrine) return;
    vitrine.innerHTML = "";
    lista.forEach(p => vitrine.append(montarCard(p)));
}

async function carregar() {
    if (estado) estado.textContent = "Carregando produtos...";
    try {
        const resposta = await fetch(`${API}/produtos`);
        if (!resposta.ok) {
            throw new Error(`A API respondeu ${resposta.status}`);
        }
        produtos = await resposta.json();
        desenhar(produtos);
        if (estado) {
            estado.textContent = produtos.length === 0 ? "Nenhum produto cadastrado ainda." : "";
        }
    } catch (erro) {
        if (estado) {
            estado.textContent = "Não foi possível falar com a API. Ela está ligada?";
        }
        console.error(erro);
    }
}

if (busca) {
    busca.addEventListener("input", (e) => {
        const termo = e.target.value.toLowerCase();
        const achados = produtos.filter(
            p => p.nome.toLowerCase().includes(termo)
        );
        desenhar(achados);
    });
}

carregar();