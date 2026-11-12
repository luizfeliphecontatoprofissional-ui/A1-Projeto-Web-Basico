/*
  Arquivo: js/comparador.js
  Projeto: ByteNova - Portal de Tecnologia
  Autores: Fellipe Augusto e Luiz Feliphe
  Finalidade: resumo dos produtos marcados na tabela do comparador.
*/

function atualizarResumo() {
    const marcados = document.querySelectorAll("#tabela input:checked");
    const resumo = document.getElementById("resumo");
    if (marcados.length === 0) {
        resumo.textContent = "Marque produtos na tabela para ver o resumo.";
        return;
    }
    let soma = 0;
    let barato = marcados[0];
    for (let i = 0; i < marcados.length; i++) {
        soma += Number(marcados[i].dataset.preco);
        if (Number(marcados[i].dataset.preco) < Number(barato.dataset.preco)) {
            barato = marcados[i];
        }
    }
    const media = soma / marcados.length;
    resumo.textContent = marcados.length + " marcado(s). Soma: " + formatarPreco(soma) + ". Média: " + formatarPreco(media) + ". Mais barato: " + barato.dataset.nome + ".";
}

const caixas = document.querySelectorAll("#tabela input");
for (let i = 0; i < caixas.length; i++) {
    caixas[i].addEventListener("change", atualizarResumo);
}
atualizarResumo();
