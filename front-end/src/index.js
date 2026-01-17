const templateEmail = document.querySelector("#template-email");
const templateFile = document.querySelector("#template-file");
const contTemplate = document.querySelector("#container-template");
const formElement = document.querySelector("#form-email");

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

document.getElementById("button-email").addEventListener("click", () => {
  const cloneEmail = templateEmail.content.cloneNode(true);
  contTemplate.innerHTML = "";
  contTemplate.append(cloneEmail);
  formElement.classList.remove("hidden");
});

document.getElementById("button-file").addEventListener("click", () => {
  const cloneFile = templateFile.content.cloneNode(true);
  contTemplate.innerHTML = "";
  contTemplate.append(cloneFile);

  formElement.classList.remove("hidden");
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
  try {
    const response = await fetch(api_url + "/doc", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
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
