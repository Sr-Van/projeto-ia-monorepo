const templateEmail = document.querySelector("#template-email");
const templateFile = document.querySelector("#template-file");
const contTemplate = document.querySelector("#container-template");
const formElement = document.querySelector("#form-email");
const buttonsHeader = document.querySelector("#buttons-header");
const btnEmail = document.querySelector("#button-email");
const btnFile = document.querySelector("#button-file");
const btnVoltar = document.querySelector("#button-voltar");
const loadingIcon = document.getElementById("loading-icon");

// deixando a api publica pois vou limitar as requisicoes e colocar o deploy na whitelist no back-end
const api_url = "https://back-igl23m2j6-srvans-projects.vercel.app/analyze";
const handleInputChange = (e) => {
  const file = e.target.files[0];
  const fileSelected = document.querySelector(".file-selected");
  const labelInput = document.querySelector("#label-input");

  // pequena animação para ficar mais fluido a remoção de um e aparição de outro
  labelInput.classList.add("opacity-0", "h-0");
  setTimeout(() => {
    labelInput.classList.add("hidden");
    fileSelected.classList.remove("hidden");
  }, 350);

  let span = document.createElement("span");
  span.classList.add(
    "text-sm",
    "font-medium",
    "text-emerald-700",
    "text-center",
    "px-4",
  );

  span.textContent = `Arquivo selecionado: ${file.name}`;
  fileSelected.append(span);
};

btnEmail.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const cloneEmail = templateEmail.content.cloneNode(true);
  contTemplate.innerHTML = "";
  contTemplate.append(cloneEmail);
  buttonsHeader.classList.add("h-0", "opacity-0");
  setTimeout(() => {
    buttonsHeader.classList.add("hidden");
    btnVoltar.classList.remove("hidden");
  }, 350);
  formElement.classList.remove("hidden");
});

btnFile.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const cloneFile = templateFile.content.cloneNode(true);
  contTemplate.innerHTML = "";
  contTemplate.append(cloneFile);

  buttonsHeader.classList.add("h-0", "opacity-0");
  setTimeout(() => {
    buttonsHeader.classList.add("hidden");
    btnVoltar.classList.remove("hidden");
  }, 350);

  formElement.classList.remove("hidden");
});

document.getElementById("button-voltar").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  e.target.classList.add("hidden");
  buttonsHeader.classList.remove("hidden");
  setTimeout(() => {
    buttonsHeader.classList.remove("h-0", "opacity-0");
  }, 350);
  formElement.classList.add("hidden");
});
const handleSubtmit = (e, form) => {
  e.preventDefault();
  const formData = new FormData(form);
  const fileField = formData.get("file");

  if (fileField && fileField.name !== "") {
    send_file(formData);
    return;
  } else {
    const email = formData.get("email_text");
    send_email(email);
    return;
  }

  // TODO: adicionar notificacao de erro por clicar sem enviar nada!
};

const send_file = async (formData) => {
  console.log(formData);
  loadingIcon.classList.remove("hidden");
  try {
    const response = await fetch(api_url + "/doc", {
      method: "POST",
      body: formData,
    });
    const data = await response.json().then((data) => {
      loadingIcon.classList.add("hidden");
      return data;
    });
    console.log(data);
  } catch (error) {
    loadingIcon.classList.add("hidden");
    console.log(error);
  }
};

const send_email = async (texto) => {
  // TODO: inserir logica de preenchimento baseado na resposta recebida, nas duas funcoes
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: texto }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
