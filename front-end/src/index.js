const templateEmail = document.querySelector("#template-email");
const templateFile = document.querySelector("#template-file");
const contTemplate = document.querySelector("#container-template");
const formElement = document.querySelector("#form-email");
const buttonsHeader = document.querySelector("#buttons-header");
const btnEmail = document.querySelector("#button-email");
const btnFile = document.querySelector("#button-file");
const btnVoltar = document.querySelector("#button-voltar");
const btnSubmit = document.querySelector("[type=submit]");
const loadingIcon = document.getElementById("loading-icon");
const listResponseElement = document.getElementById("list-response");

// deixando a api publica pois vou limitar as requisicoes e colocar o deploy na whitelist no back-end
// para rodar localmente, utilize a url http://localhost:8000/analyze no lugar desta
const api_url = "https://back-end-iota-six.vercel.app/analyze";
let responseList = [];
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

const toggleView = (showForm, template = null) => {
  if (showForm && template) {
    const clone = template.content.cloneNode(true);
    contTemplate.replaceChildren(clone);

    buttonsHeader.classList.add("h-0", "opacity-0");
    setTimeout(() => {
      buttonsHeader.classList.add("hidden");
      btnVoltar.classList.remove("hidden");
    }, 350);
    formElement.classList.remove("hidden");
  } else {
    btnVoltar.classList.add("hidden");
    buttonsHeader.classList.remove("hidden");
    setTimeout(() => {
      buttonsHeader.classList.remove("h-0", "opacity-0");
    }, 100);
    formElement.classList.add("hidden");
  }
};

btnEmail.addEventListener("click", () => toggleView(true, templateEmail));
btnFile.addEventListener("click", () => toggleView(true, templateFile));
btnVoltar.addEventListener("click", () => toggleView(false));
const handleSubtmit = (e, form) => {
  e.preventDefault();
  const formData = new FormData(form);
  const fileField = formData.get("file");

  if (fileField && fileField.name !== "") {
    send_file(formData);
    return;
  }
  const email = formData.get("email_text");
  if (email) {
    send_email(email);
    return;
  }

  alert("Nenhuma dado enviado, por favor selecione um e-mail ou um arquivo");
};

const send_file = async (formData) => {
  loadingIcon.classList.remove("hidden");
  btnSubmit.setAttribute("disabled", true);
  try {
    const response = await fetch(api_url + "/doc", {
      method: "POST",
      body: formData,
    });
    const data = await response.json().then((data) => {
      return data;
    });
    renderResponse(data);
  } catch (error) {
    showToast("Ocorreu um erro ao enviar o e-mail", "error");
    console.log(error);
  }
  loadingIcon.classList.add("hidden");
  btnSubmit.removeAttribute("disabled");
};

const send_email = async (texto) => {
  loadingIcon.classList.remove("hidden");
  btnSubmit.setAttribute("disabled", true);
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: texto }),
    });
    const data = await response.json().then((data) => data);
    renderResponse(data);
  } catch (error) {
    showToast("Ocorreu um erro ao enviar o e-mail", "error");
    console.log(error);
  }
  loadingIcon.classList.add("hidden");
  btnSubmit.removeAttribute("disabled");
};

const renderResponse = (data) => {
  listResponseElement.innerHTML = "";
  const { is_productive, response } = data;
  const obj = {
    is_productive,
    response,
  };

  responseList.push(obj);
  responseList.forEach((item) => {
    const isProd = item.is_productive;
    const responseText = isProd
      ? item.response
      : "Nenhuma resposta para esse e-mail";
    const cell = generateCell(isProd, responseText);
    listResponseElement.append(cell);
  });
};

const generateCell = (isProd, response) => {
  const containerPrincipal = document.createElement("div");
  containerPrincipal.className =
    "mt-8 bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden";

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "p-6 md:p-8 flex flex-col gap-2";

  const headerBadge = document.createElement("div");
  headerBadge.className = "flex items-center gap-2 mb-4";

  const dot = document.createElement("div");
  dot.className = isProd
    ? "w-2 h-2 bg-emerald-500 rounded-full"
    : "w-2 h-2 bg-red-500 rounded-full";

  const labelCategoria = document.createElement("span");
  labelCategoria.className = isProd
    ? "text-xs font-black text-emerald-600 uppercase tracking-widest"
    : "text-xs font-black text-red-600 uppercase tracking-widest";
  labelCategoria.textContent = `Resultado: ${isProd ? "Produtivo" : "Improdutivo"}`;

  headerBadge.appendChild(dot);
  headerBadge.appendChild(labelCategoria);

  const labelResposta = document.createElement("span");
  labelResposta.className =
    "text-xs font-black text-slate-600 uppercase tracking-widest";
  labelResposta.textContent = "Resposta:";

  const divTexto = document.createElement("div");
  divTexto.id = "response-text";
  divTexto.className = "text-slate-600 text-base leading-relaxed italic";
  divTexto.textContent = response;

  contentWrapper.appendChild(headerBadge);
  contentWrapper.appendChild(labelResposta);
  contentWrapper.appendChild(divTexto);

  const footerGrid = document.createElement("div");
  footerGrid.className =
    "bg-slate-50 p-4 border-t border-slate-100 grid grid-cols-2 gap-px bg-slate-200";

  const btnCopiar = document.createElement("button");
  btnCopiar.className = `${isProd ? "" : "pointer-events-none"} py-4 text-xs font-bold text-slate-500 uppercase flex items-center justify-center gap-2 active:bg-slate-100`;

  const svgIcon = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
    `;
  btnCopiar.innerHTML = svgIcon + "<span>Copiar</span>";
  btnCopiar.onclick = () => {
    navigator.clipboard.writeText(response);
    alert("Copiado!");
  };

  const btnExcluir = document.createElement("button");
  btnExcluir.className =
    "py-4 text-xs font-bold text-red-400 uppercase active:bg-slate-100";
  btnExcluir.textContent = "Excluir";
  btnExcluir.onclick = () => {
    containerPrincipal.remove();
  };

  footerGrid.appendChild(btnCopiar);
  footerGrid.appendChild(btnExcluir);

  containerPrincipal.appendChild(contentWrapper);
  containerPrincipal.appendChild(footerGrid);

  return containerPrincipal;
};

// o toast é pra tratamento de erro no front, exibir a mensagem baseada em cada código HTTP recebido na resposta. Mas por agora, vai ser só ocasional e simples
const showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container");
  const template = document.getElementById("template-toast");
  const clone = template.content.cloneNode(true);

  const toastDiv = clone.querySelector("div");
  const textSpan = clone.querySelector(".msg-text");
  const closeBtn = clone.querySelector("button");

  textSpan.textContent = message;
  const borderColor =
    type === "success" ? "border-green-500" : "border-red-500";
  toastDiv.classList.add(borderColor);

  container.appendChild(toastDiv);

  setTimeout(() => {
    toastDiv.classList.remove("translate-y-10", "opacity-0");
  }, 10);

  const removeToast = () => {
    toastDiv.classList.add("opacity-0");
    setTimeout(() => toastDiv.remove(), 300);
  };

  closeBtn.onclick = removeToast;
  setTimeout(removeToast, 3000);
};

setTimeout(() => {
  showToast("Bem-vindo ao Analisador de Texto!", "success");
}, 2000);
