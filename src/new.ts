const myModal = document.getElementById("register-modal") as HTMLFormElement;
const inputEmail = document.getElementById("newemailUser") as HTMLInputElement;
const inputPass = document.getElementById("newpass") as HTMLInputElement;
const inputRPass = document.getElementById("rpass") as HTMLInputElement;


interface Iuser {
  emailUser: string;
  pass: string;
  messages?: [];
}

function cadastrar(): void {
  if (!verificarNome(inputEmail.value)) {
    return alert("Insira um nome válido");
  }
  if (!verificarSenhas(inputPass.value, inputRPass.value)) {
    return mostrarAlerta("Insira uma senha válida", "warning");
  }

  const newUser: Iuser = {
    emailUser: inputEmail.value,
    pass: inputPass.value,
  };

  const users: Iuser[] =
    JSON.parse(window.localStorage.getItem("users") as string) || [];

  if (
    users.findIndex(
      (usuario) => usuario.emailUser === newUser.emailUser
    ) !== -1
  ) {
    return mostrarAlertaBS(
      `O nome ${newUser.emailUser} não está disponível.`,
      "danger"
    );
  }

  users.push(newUser);

  window.localStorage.setItem("users", JSON.stringify(users));
  mostrarAlertaBS(
    `Conta de ${inputEmail.value} cadastrada com sucesso!`,
    "success"
  );
  limparForms();

  setTimeout(() => {
    window.location.href = "index.html";

  }, 2000);

  return;
}
function verificarSenhas(newpass: string, rpass: string): boolean {
  if (newpass === rpass && newpass.length >= 3) {
    return true;
  }
  return false;
}
function verificarNome(newemailUser: string): boolean {
  console.log(newemailUser);
  if (newemailUser.length >= 3) {
    return true;
  }
  return false;
}

function limparForms(): void {
  inputEmail.value = "";
  inputPass.value = "";
  inputRPass.value = "";
}

function mostrarAlerta(mensagem: string, tipo: string): void {
  const corpoAlerta: HTMLDivElement = document.createElement("div");
  corpoAlerta.style.zIndex = "999";
  corpoAlerta.classList.add(
    `bg-${tipo}`,
    "d-flex",
    "flex-column",
    "align-items-center",
    "h1"
  );
  corpoAlerta.classList.remove("h1");

  const menssagemAlerta: HTMLParagraphElement = document.createElement("p");
  menssagemAlerta.classList.add("h3", "fw-bold", "text-center");
  menssagemAlerta.innerText = mensagem;

  corpoAlerta.appendChild(menssagemAlerta);

  const localAlerta = document.getElementById("local-alerta") as HTMLDivElement;

  localAlerta.appendChild(corpoAlerta);
  localAlerta.classList.remove("d-none");

  setTimeout(() => {
    localAlerta.innerHTML = "";
    localAlerta.classList.add("d-none");
  }, 2000);
}

function mostrarAlertaBS(mensagem: string, tipo: string): void {
  const alerta = document.getElementById("local-alerta-bs") as HTMLDivElement;
  alerta.classList.remove("d-none");
  alerta.classList.add(`alert-${tipo}`);
  alerta.innerText = mensagem;

  const wrapper: HTMLDivElement = document.getElementById(
    "wrapper"
  ) as HTMLDivElement;
  wrapper.classList.remove("d-none");
  wrapper.classList.add("wrapper");

  //   setTimeout(() => {
  //     alerta.innerText = "";
  //     alerta.classList.add("d-none");
  //     alerta.classList.remove(`alert-${tipo}`);
  //   }, 2000);
}
