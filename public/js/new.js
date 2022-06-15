"use strict";
const myModal = document.getElementById("register-modal");
const inputEmail = document.getElementById("newemailUser");
const inputPass = document.getElementById("newpass");
const inputRPass = document.getElementById("rpass");
function cadastrar() {
    if (!verificarNome(inputEmail.value)) {
        return alert("Insira um nome válido");
    }
    if (!verificarSenhas(inputPass.value, inputRPass.value)) {
        return mostrarAlerta("Insira uma senha válida", "warning");
    }
    const newUser = {
        emailUser: inputEmail.value,
        pass: inputPass.value,
    };
    const users = JSON.parse(window.localStorage.getItem("users")) || [];
    if (users.findIndex((usuario) => usuario.emailUser === newUser.emailUser) !== -1) {
        return mostrarAlertaBS(`O nome ${newUser.emailUser} não está disponível.`, "danger");
    }
    users.push(newUser);
    window.localStorage.setItem("users", JSON.stringify(users));
    mostrarAlertaBS(`Conta de ${inputEmail.value} cadastrada com sucesso!`, "success");
    limparForms();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
    return;
}
function verificarSenhas(newpass, rpass) {
    if (newpass === rpass && newpass.length >= 3) {
        return true;
    }
    return false;
}
function verificarNome(newemailUser) {
    console.log(newemailUser);
    if (newemailUser.length >= 3) {
        return true;
    }
    return false;
}
function limparForms() {
    inputEmail.value = "";
    inputPass.value = "";
    inputRPass.value = "";
}
function mostrarAlerta(mensagem, tipo) {
    const corpoAlerta = document.createElement("div");
    corpoAlerta.style.zIndex = "999";
    corpoAlerta.classList.add(`bg-${tipo}`, "d-flex", "flex-column", "align-items-center", "h1");
    corpoAlerta.classList.remove("h1");
    const menssagemAlerta = document.createElement("p");
    menssagemAlerta.classList.add("h3", "fw-bold", "text-center");
    menssagemAlerta.innerText = mensagem;
    corpoAlerta.appendChild(menssagemAlerta);
    const localAlerta = document.getElementById("local-alerta");
    localAlerta.appendChild(corpoAlerta);
    localAlerta.classList.remove("d-none");
    setTimeout(() => {
        localAlerta.innerHTML = "";
        localAlerta.classList.add("d-none");
    }, 2000);
}
function mostrarAlertaBS(mensagem, tipo) {
    const alerta = document.getElementById("local-alerta-bs");
    alerta.classList.remove("d-none");
    alerta.classList.add(`alert-${tipo}`);
    alerta.innerText = mensagem;
    const wrapper = document.getElementById("wrapper");
    wrapper.classList.remove("d-none");
    wrapper.classList.add("wrapper");
    //   setTimeout(() => {
    //     alerta.innerText = "";
    //     alerta.classList.add("d-none");
    //     alerta.classList.remove(`alert-${tipo}`);
    //   }, 2000);
}
