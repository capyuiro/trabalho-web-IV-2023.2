import usuarioView from "../view/UsuarioView.js";
import { API_BASE_URL } from "../config/config.js";


/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} login - Elemento principal onde o formulário será renderizado.
 */
function renderizarCadastroFormulario(login) {
  login.innerHTML = usuarioView.renderizarFormulario();
  document.getElementById("login-form").addEventListener("submit", cadastrarUsuario);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarUsuario(event) {
  event.preventDefault();
  const nomeVal = document.getElementById("cadastro_formulario_nome").value;
  const emailVal = document.getElementById("cadastro_formulario_email").value;
  const senhaVal = document.getElementById("cadastro_formulario_senha").value;
  const dataVal = document.getElementById("cadastro_formulario_dataNasc").value;

  const novoUsuario = { nome: nomeVal, email: emailVal, senha: senhaVal, data_de_nasc: dataVal };
  
  try {
    await fetch(`${API_BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });
    login.innerHTML = usuarioView.renderizarFormularioLogin();
  } catch (error) {
    console.error("Erro ao adicionar usuario:", error);
  }
}

const UsuarioController = {
  renderizarCadastroFormulario,
};

export default UsuarioController;
