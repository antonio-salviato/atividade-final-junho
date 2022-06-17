const modalForm = document.querySelector("#register-modal") as HTMLFormElement;
const formularioLogin = document.querySelector(
  "#formularioLogin"
) as HTMLFormElement;
const submit = document.getElementById("submitBtn") as HTMLButtonElement;

const atualizaLocalStorage = (users: Array<Iuser>) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const recuperaLocalStorage = (): Array<Iuser> => {
  const usuarios = JSON.parse(
    localStorage.getItem("users") || "[]"
  ) as Array<Iuser>;
  return usuarios;
};

const login = (event: Event) => {
 
  const users: Array<Iuser> = recuperaLocalStorage();
  const emailUser: string = formularioLogin?.emailUser.value;
  const pass: string = formularioLogin?.pass.value;
  console.log(formularioLogin)
  const usuarioValido = users.find(
    (usuario) => usuario.emailUser === emailUser && usuario.pass === pass
  );
  if (usuarioValido === undefined) {
    alert("Usuário ou senha inválida");

    return;
  }
  const dadosLogin = usuarioValido.emailUser;
  sessionStorage.setItem("dadosLogin", JSON.stringify(dadosLogin));
  // localStorage.setItem("dadosLogin", JSON.stringify(dadosLogin));
  location.href = "./mural.html";
};


