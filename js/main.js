/*
  Arquivo: js/main.js
  Projeto: ByteNova - Portal de Tecnologia
  Autores: Fellipe Augusto e Luiz Feliphe
  Finalidade: cartões, filtros, ofertas e página de favoritos.
*/

function formatarPreco(valor) {
    return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function criarCard(p) {
    let precos = formatarPreco(p.preco);
    let selo = "";
    if (p.oferta) {
        precos += " <s>" + formatarPreco(p.precoAntigo) + "</s>";
        selo = "<span class='selo'>Oferta</span>";
    }
    let texto = "Favoritar";
    if (ehFavorito(p.id)) {
        texto = "Remover dos favoritos";
    }
    return `<article class="cartao">
        ${selo}
        <img src="${p.imagem}" alt="${p.nome}">
        <div class="cartao-corpo">
            <h3>${p.nome}</h3>
            <p>${p.resumo}</p>
            <p class="spec">${p.spec}</p>
            <p class="preco">${precos}</p>
            <button class="botao" type="button" data-id="${p.id}">${texto}</button>
        </div>
    </article>`;
}

function mostrarProdutos(lista, destino) {
    let html = "";
    for (let i = 0; i < lista.length; i++) {
        html += criarCard(lista[i]);
    }
    destino.innerHTML = html;
}

function filtrar(lista, campo, valor) {
    const resultado = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i][campo] === valor) {
            resultado.push(lista[i]);
        }
    }
    return resultado;
}

function mostrarCatalogo() {
    const destino = document.getElementById("lista-produtos");
    const perfil = document.getElementById("perfil").value;
    let lista = filtrar(produtos, "categoria", destino.dataset.categoria);
    if (perfil !== "todos") {
        lista = filtrar(lista, "perfil", perfil);
    }
    mostrarProdutos(lista, destino);
    document.getElementById("mensagem").textContent = lista.length + " produto(s) encontrado(s).";
}

function mostrarFavoritos() {
    const ids = lerFavoritos();
    const salvos = [];
    for (let i = 0; i < produtos.length; i++) {
        if (ids.includes(produtos[i].id)) {
            salvos.push(produtos[i]);
        }
    }
    mostrarProdutos(salvos, document.getElementById("lista-favoritos"));
    document.getElementById("resumo").textContent = "Você tem " + salvos.length + " favorito(s).";
    document.getElementById("mensagem-vazia").hidden = salvos.length > 0;
    document.getElementById("botao-limpar").hidden = salvos.length === 0;
}

function clicarNoCard(evento) {
    if (evento.target.dataset.id === undefined) {
        return;
    }
    const adicionado = alternarFavorito(Number(evento.target.dataset.id));
    if (adicionado) {
        evento.target.textContent = "Remover dos favoritos";
    } else {
        evento.target.textContent = "Favoritar";
    }
    if (document.getElementById("lista-favoritos") !== null) {
        mostrarFavoritos();
    }
}

document.addEventListener("click", clicarNoCard);

if (document.getElementById("lista-produtos") !== null) {
    mostrarCatalogo();
    document.getElementById("perfil").addEventListener("change", mostrarCatalogo);
}

if (document.getElementById("destaques") !== null) {
    mostrarProdutos(filtrar(produtos, "destaque", true).slice(0, 6), document.getElementById("destaques"));
    mostrarProdutos(filtrar(produtos, "oferta", true).slice(0, 3), document.getElementById("ofertas-home"));
}

if (document.getElementById("lista-ofertas") !== null) {
    mostrarProdutos(filtrar(produtos, "oferta", true), document.getElementById("lista-ofertas"));
}

if (document.getElementById("lista-favoritos") !== null) {
    mostrarFavoritos();
    document.getElementById("botao-limpar").addEventListener("click", function () {
        localStorage.removeItem(CHAVE);
        mostrarFavoritos();
    });
}

if (document.getElementById("botao-menu") !== null) {
    document.getElementById("botao-menu").addEventListener("click", function () {
        document.getElementById("lista-menu").classList.toggle("aberto");
    });
}
