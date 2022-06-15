const formulario = document.querySelector("#mural") as HTMLFormElement;
const corpoTabela = document.querySelector("#tbody") as HTMLTableElement;
const descricao = document.querySelector("#descricao") as HTMLFormElement;
let botaoEditar = false;
let editIndex = 0;

interface Mensagem {
    id: number;
    descricao: string;
    msg: string;
  }

  const usuarioLogado = (): string => {
    const  userLog: string = localStorage.getItem("users") || "[]";
      return userLog;
  };

  const atualizaMgsLocalStorage = (mensagem: Array<Mensagem>): void => {
    const userAtual: string = usuarioLogado();
    localStorage.setItem(userAtual, JSON.stringify(mensagem));
  };
  
  const recuperaMsgLocalStorage = (): Array<Mensagem> => {
    const userLog: string = usuarioLogado();
    const mensage: Array<Mensagem> = JSON.parse(localStorage.getItem(userLog) || "[]");
    return mensage;
  };

const salvarMsgem =  (event: Event): void => {
    event.preventDefault()
    const descricao = formulario.descricao.value;
    const msg = formulario.msg.value;
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
        msgem[editIndex].descricao = descricao;
        msgem[editIndex].msg = msg;
        botaoEditar = false;
    }else {
        msgem.push({
            id: definirID() + 1,
            descricao: descricao,
            msg: msg,
        });
    }  
    }

    atualizaMgsLocalStorage(message);
    alert("Mensagem adicionada!");

    
    formulario.reset();
    const preencherTabela = () => {
        const msgem = recuperaMsgLocalStorage();
        corpoTabela.innerHTML = "";
        for (const message of msgem) {
            corpoTabela.innerHTML += `
            <tr>
            <td>${message.id}</td>
            <td>${message.descricao}</td>
            <td>${message.msg}</td>
            <td>
            <img src="./assets/edit_ico.svg" alt="editar" width="40" onclick="editar(${message.id})" >
            <img src="./assets/lixo.svg" alt="imagem de lixeira" width="40" onclick="removeMsg(${message.id})" >
            
            </td>
            </tr>
            `;
        }
    };
    preencherTabela();
    
    const editar = (id) => {
    const lista = recuperaMsgLocalStorage();
    const indiceMsg = lista.findIndex((message) => message.id === id);
    formulario.descricao.value = lista[indiceMsg].descricao;
    formulario.msg.value = lista[indiceMsg].msg;
    botaoEditar = true;
    editIndex = indiceMsg;
};

const removeMsg = (id) => {
    if (confirm("Você tem certeza que deseja apagar esse recado?"));
    const msgem = recuperarLocalStorage();
    const indiceMsg = msgem.findIndex((message) => message.id === id);
    if (indiceMsg < 0) return;
    msgem.splice(indiceMsg, 1);
    atualizarLocalStorage(msgem);
    alert("Mensagem removida com sucesso");
    preencherTabela();
};

const definirID = () => {
    let max = 0;
    const msgem = recuperarLocalStorage();
    msgem.forEach((message) => {
        if (message.id > max) {
            max = message.id;
        }
    });
    return max;
};

form.addEventListener("submit", salvarMsgem);
document.addEventListener("DOMContentLoaded", preencherTabela);
