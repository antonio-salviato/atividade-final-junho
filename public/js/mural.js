"use strict";
const formulario = document.querySelector("#mural");
const corpoTabela = document.querySelector("#tbody");
const titulo = document.querySelector("#titleInput");
const recado = document.querySelector("#messageInput");
const descricao = document.querySelector("#descricao");
const msgModal = document.querySelector("#msgModal");
let botaoEditar = false;
let editIndex = 0;
const usuarioLogado = () => {
    const userLog = JSON.parse(sessionStorage.getItem("dadosLogin") || "[]");
    return userLog;
};
const atualizaMgsLocalStorage = (message) => {
    const userAtual = usuarioLogado();
    localStorage.setItem(userAtual, JSON.stringify(message));
};
const recuperaMsgLocalStorage = () => {
    const userLog = usuarioLogado();
    const mensage = JSON.parse(localStorage.getItem(userLog) || "[]");
    return mensage;
};
function salvarMsgem() {
    // event.preventDefault()
    const titulo = formulario.titulo.value;
    const recado = formulario.recado.value;
    const message = recuperaMsgLocalStorage();
    alert(titulo);
    const msgUser = usuarioLogado();
    if (msgUser === "[]") {
        alert("Você será redirecionado para fazer seu login");
        setTimeout(() => {
            location.href = "index.html";
        }, 3000);
        return;
    }
    const msgem = recuperaMsgLocalStorage();
    if (botaoEditar == true) {
        alert("Mensagem alterada com sucesso");
        msgem[editIndex].titulo = titulo;
        msgem[editIndex].recado = recado;
        botaoEditar = false;
    }
    else {
        msgem.push({
            id: definirID() + 1,
            titulo: titulo,
            recado: recado,
        });
    }
    atualizaMgsLocalStorage(message);
    alert("Mensagem adicionada!");
    formulario.reset();
    preencherTabela();
}
const preencherTabela = () => {
    const msgem = recuperaMsgLocalStorage();
    corpoTabela.innerHTML = "";
    for (const message of msgem) {
        corpoTabela.innerHTML += `
            <tr>
            <td>${message.id}</td>
            <td>${message.titulo}</td>
            <td>${message.recado}</td>
            <td>
            <img src="./assets/edit_ico.svg" alt="editar" width="40" onclick="editar(${message.id})" >
            <img src="./assets/lixo.svg" alt="imagem de lixeira" width="40" onclick="removeMsg(${message.id})" >
            
            </td>
            </tr>
            `;
    }
};
const editar = (id) => {
    const lista = recuperaMsgLocalStorage();
    const indiceMsg = lista.findIndex((message) => message.id === id);
    formulario.descricao.value = lista[indiceMsg].titulo;
    formulario.msg.value = lista[indiceMsg].recado;
    botaoEditar = true;
    editIndex = indiceMsg;
};
const removeMsg = (id) => {
    if (confirm("Você tem certeza que deseja apagar esse recado?")) {
        const msgem = recuperaMsgLocalStorage();
        const indiceMsg = msgem.findIndex((message) => message.id === id);
        if (indiceMsg < 0)
            return;
        msgem.splice(indiceMsg, 1);
        atualizaMgsLocalStorage(msgem);
        alert("Mensagem removida com sucesso");
        preencherTabela();
    }
};
const definirID = () => {
    let max = 0;
    const msgem = recuperaMsgLocalStorage();
    msgem.forEach((message) => {
        if (message.id > max) {
            max = message.id;
        }
    });
    return max;
};
// formulario.addEventListener("submit", salvarMsgem);
document.addEventListener("DOMContentLoaded", preencherTabela);
