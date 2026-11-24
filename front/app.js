const produtos = [
    { nome: "Camiseta básica", preco: 39.9, tam: "M" },
    { nome: "Calça jeans", preco: 129.0, tam: "G" },
    { nome: "Moletom", preco: 159.9, tam: "M" }
];

const vitrine = document.querySelector("#vitrine");
const busca = document.querySelector("#busca");

function montarCard(p) {
    const art = document.createElement("article");
    art.className = "produto";
    art.innerHTML = `
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)}</p>
        <p>Tamanho ${p.tam}</p>
    `;
    return art;
}

function desenhar(lista) {
    if (!vitrine) return;
    vitrine.innerHTML = "";
    lista.forEach(p => vitrine.append(montarCard(p)));
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

const form = document.querySelector("#form-produto");
const aviso = document.querySelector("#aviso");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.querySelector("#nome").value.trim();
        const preco = Number(document.querySelector("#preco").value);

        if (nome === "") {
            aviso.textContent = "Informe o nome do produto.";
            return;
        }

        if (!(preco > 0)) {
            aviso.textContent = "O preço precisa ser maior que zero.";
            return;
        }

        produtos.push({ nome, preco, tam: "M" });
        form.reset();
        aviso.textContent = "Produto cadastrado.";
    });
}

desenhar(produtos);