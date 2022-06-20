const formulario = document.querySelector("#formulario") as HTMLFormElement;
const corpoTabela = document.querySelector("#tbody") as HTMLTableElement;
const titulo = document.querySelector("#titleInput") as HTMLInputElement;
const recado = document.querySelector("#messageInput") as HTMLInputElement;
let botaoEditar: boolean = false;
let editIndex: number = 0;

const userLogged = JSON.parse(sessionStorage.getItem("dadosLogin") || "");

interface Mensagem {
  id: number;
  titulo: string;
  recado: string;
}

const usuarioLogado = (): string => {
  const userLog: string = JSON.parse(
    sessionStorage.getItem("dadosLogin") || "[]"
  );
  return userLog;
};

const atualizaMgsLocalStorage = (message: Array<Mensagem>): void => {
  const userAtual: string = usuarioLogado();
  localStorage.setItem(userAtual, JSON.stringify(message));
};

const recuperaMsgLocalStorage = (): Array<Mensagem> => {
  const userLog: string = usuarioLogado();
  const mensage: Array<Mensagem> = JSON.parse(
    localStorage.getItem(userLog) || "[]"
  );
  return mensage;
};

function salvarMsgem(): void {
  let form = document.getElementById("formulario") as HTMLFormElement;
  if(botaoEditar == true) {
    form = document.getElementById("formulario_edit") as HTMLFormElement;
  }
  const tit: string = form.titulo.value;
  const rec: string = form.recado.value;
  const message: Array<Mensagem> = recuperaMsgLocalStorage();

  const msgUser: string = usuarioLogado();
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
  } else {
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
            <i class="bi bi-pencil-square ms-2"onclick="editar(${message.id})" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <i class="bi bi-trash me-4 ms-4" onclick="removeMsg(${message.id})" ></i>
            
            </td>
            </tr>
            `;
  }
};
const editar = (id: any) => {
  const lista = recuperaMsgLocalStorage();
  const indiceMsg = lista.findIndex((message) => message.id === id);
  const recado = lista[indiceMsg];
  const form = document.getElementById("formulario_edit") as HTMLFormElement;
  console.log(recado);
  form.titulo.value = recado.titulo;
  form.recado.value = recado.recado;
  botaoEditar = true;
  editIndex = indiceMsg;
};

const removeMsg = (id: any) => {
  if (confirm("Você tem certeza que deseja apagar esse recado?")) {
    const msgem = recuperaMsgLocalStorage();
    const indiceMsg = msgem.findIndex((message) => message.id === id);
    if (indiceMsg < 0) return;
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
