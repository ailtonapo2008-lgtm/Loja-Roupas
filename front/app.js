const produtos = [
    { nome: "Camiseta básica", preco: 39.9, tam: "M" },
    { nome: "Calça jeans", preco: 129.0, tam: "G" },
    { nome: "Moletom", preco: 159.9, tam: "M" }
];

const vitrine = document.querySelector("#vitrine");

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
    vitrine.innerHTML = "";
    lista.forEach(p => vitrine.append(montarCard(p)));
}

desenhar(produtos);