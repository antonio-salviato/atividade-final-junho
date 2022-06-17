"use strict";
const formulario = document.querySelector("#formulario");
const corpoTabela = document.querySelector("#tbody");
//const titulo = document.getElementById("titleInput") as HTMLInputElement;
const titulo = document.querySelector("#titleInput");
const recado = document.querySelector("#messageInput");
// const descricao = document.querySelector("#descricao") as HTMLFormElement;
const msgModal = document.querySelector("#msgModal");
let botaoEditar = false;
let editIndex = 0;
const userLogged = JSON.parse(sessionStorage.getItem("dadosLogin") || "");
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
    const tit = titulo.value;
    const rec = recado.value;
    const message = recuperaMsgLocalStorage();
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
        msgem[editIndex].titulo = tit;
        msgem[editIndex].recado = rec;
        botaoEditar = false;
    }
    else {
        msgem.push({
            id: definirID() + 1,
            titulo: tit,
            recado: rec,
        });
    }
    atualizaMgsLocalStorage(msgem);
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
            <img src="../public/assets/edit_ico.svg" alt="editar" width="40" onclick="editar(${message.id})" >
            <img src="../public/assets/lixo.svg" alt="imagem de lixeira" width="40" onclick="removeMsg(${message.id})" >
            
            </td>
            </tr>
            `;
    }
};
const editar = (id) => {
    const lista = recuperaMsgLocalStorage();
    const indiceMsg = lista.findIndex((message) => message.id === id);
    const recado = lista[indiceMsg];
    formulario.titulo.value = recado.titulo;
    formulario.recado.value = recado.recado;
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
function sairSistema() {
    localStorage.removeItem("userLogado");
    document.location.href = "./index.html";
}
document.addEventListener("DOMContentLoaded", preencherTabela);
