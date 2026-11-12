/*
  Arquivo: js/favoritos.js
  Projeto: ByteNova - Portal de Tecnologia
  Autores: Fellipe Augusto e Luiz Feliphe
  Finalidade: guarda os favoritos no localStorage.
*/

const CHAVE = "bytenova_favoritos";

function lerFavoritos() {
    const texto = localStorage.getItem(CHAVE);
    if (texto === null) {
        return [];
    }
    return JSON.parse(texto);
}

function ehFavorito(id) {
    return lerFavoritos().indexOf(id) !== -1;
}

function alternarFavorito(id) {
    const lista = lerFavoritos();
    const posicao = lista.indexOf(id);
    let adicionado = false;
    if (posicao === -1) {
        lista.push(id);
        adicionado = true;
    } else {
        lista.splice(posicao, 1);
    }
    localStorage.setItem(CHAVE, JSON.stringify(lista));
    return adicionado;
}
