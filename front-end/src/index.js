const templateEmail = document.querySelector("#template-email");
const templateFile = document.querySelector("#template-file");
const contTemplate = document.querySelector("#container-template");

const cloneEmail = templateEmail.content.cloneNode(true);
const cloneFile = templateFile.content.cloneNode(true);
// dando append so para verificar o layout do template
contTemplate.append(cloneEmail);
contTemplate.append(cloneFile);
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
