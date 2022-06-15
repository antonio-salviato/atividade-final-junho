"use strict";
const modalForm = document.querySelector("#register-modal");
const formularioLogin = document.querySelector("#formularioLogin");
const submit = document.getElementById("submitBtn");
const atualizaLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
const recuperaLocalStorage = () => {
    const usuarios = JSON.parse(localStorage.getItem("users") || "[]");
    return usuarios;
};
const login = (event) => {
    const users = recuperaLocalStorage();
    const emailUser = formularioLogin?.emailUser.value;
    const pass = formularioLogin?.pass.value;
    console.log(formularioLogin);
    const usuarioValido = users.find((usuario) => usuario.emailUser === emailUser && usuario.pass === pass);
    if (usuarioValido === undefined) {
        alert("Usuário ou senha inválida");
        return;
    }
    const dadosLogin = usuarioValido.emailUser;
    sessionStorage.setItem("dadosLogin", JSON.stringify(dadosLogin));
    localStorage.setItem("dadosLogin", JSON.stringify(dadosLogin));
    location.href = "./mural.html";
};
