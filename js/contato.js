/*
  Arquivo: js/contato.js
  Projeto: ByteNova - Portal de Tecnologia
  Autores: Fellipe Augusto e Luiz Feliphe
  Finalidade: resposta do formulário de contato.
*/

function responder(evento) {
    evento.preventDefault();
    const nome = document.getElementById("nome").value;
    const assunto = document.getElementById("assunto").value;
    let texto = "";
    switch (assunto) {
        case "duvida":
            texto = "Vamos responder sua dúvida sobre produtos.";
            break;
        case "sugestao":
            texto = "Obrigado pela sugestão de conteúdo.";
            break;
        case "erro":
            texto = "Vamos verificar o erro informado.";
            break;
        default:
            texto = "Recebemos a sua mensagem.";
    }
    const alerta = document.getElementById("alerta");
    alerta.className = "alert alert-success mt-3";
    alerta.textContent = "Olá, " + nome + "! " + texto;
    document.getElementById("formulario").reset();
}

document.getElementById("formulario").addEventListener("submit", responder);
