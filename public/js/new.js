"use strict";
const myModal = document.getElementById("register-modal");
const inputEmail = document.getElementById("name");
const inputPass = document.getElementById("pass");
const inputRPass = document.getElementById("rpass");
const cadastrarButton = document.getElementById("button");
function cadastrar() {
    if (!verificarNome(inputEmail.value)) {
        return alert("Insira um nome válido");
    }
    if (!verificarSenhas(inputPass.value, inputRPass.value)) {
        return mostrarAlerta("Insira uma senha válida", 'warning');
    }
    const newUser = {
        name: inputEmail.value,
        pass: inputPass.value,
    };
    const users = JSON.parse(window.localStorage.getItem("users")) || [];
    if (users.findIndex((user) => user.name === newUser.name) !== -1) {
        return mostrarAlertaBS(`O nome ${newUser.name} não está disponível.`, 'danger');
    }
    users.push(newUser);
    window.localStorage.setItem('users', JSON.stringify(users));
    // alert(`Conta de ${inputEmail.value} cadastrada com sucesso!`)
    mostrarAlertaBS(`Conta de ${inputEmail.value} cadastrada com sucesso!`, 'success');
    limparForms();
    return;
}
function verificarSenhas(pass, rpass) {
    if (pass === rpass && pass.length >= 3) {
        return true;
    }
    return false;
}
function verificarNome(name) {
    if (name.length >= 3) {
        return true;
    }
    return false;
}
function limparForms() {
    inputEmail.value = "";
    inputPass.value = "";
    inputRPass.value = "";
    window.location.href = "index.html";
}
function mostrarAlerta(mensagem, tipo) {
    const corpoAlerta = document.createElement('div');
    corpoAlerta.style.zIndex = '999';
    corpoAlerta.classList.add(`bg-${tipo}`, 'd-flex', "flex-column", "align-items-center", 'h1');
    corpoAlerta.classList.remove('h1');
    const menssagemAlerta = document.createElement('p');
    menssagemAlerta.classList.add("h3", "fw-bold", 'text-center');
    menssagemAlerta.innerText = mensagem;
    corpoAlerta.appendChild(menssagemAlerta);
    const localAlerta = document.getElementById("local-alerta");
    localAlerta.appendChild(corpoAlerta);
    localAlerta.classList.remove('d-none');
    setTimeout(() => {
        localAlerta.innerHTML = '';
        localAlerta.classList.add('d-none');
    }, 2000);
}
function mostrarAlertaBS(mensagem, tipo) {
    const alerta = document.getElementById("local-alerta-bs");
    alerta.classList.remove('d-none');
    alerta.classList.add(`alert-${tipo}`);
    alerta.innerText = mensagem;
    const wrapper = document.getElementById('wrapper');
    wrapper.classList.remove('d-none');
    wrapper.classList.add('wrapper');
    setTimeout(() => {
        alerta.innerText = '';
        alerta.classList.add('d-none');
        alerta.classList.remove(`alert-${tipo}`);
    }, 2000);
}
