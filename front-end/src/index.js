const templateEmail = document.querySelector("#template-email");
const templateFile = document.querySelector("#template-file");
const contTemplate = document.querySelector("#container-template");

const cloneEmail = templateEmail.content.cloneNode(true);
const cloneFile = templateFile.content.cloneNode(true);
// dando append so para verificar o layout do template
contTemplate.append(cloneEmail);
contTemplate.append(cloneFile);
