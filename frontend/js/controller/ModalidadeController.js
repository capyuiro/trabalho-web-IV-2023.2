import modalidadeView from "../view/ModalidadeView.js";
import { API_BASE_URL } from "../config/config.js";


/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarModalidadeFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = modalidadeView.renderizarFormulario();
  document.getElementById("formulario_modalidade").addEventListener("submit", cadastrarModalidade);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarModalidade(event) {
  event.preventDefault();
  const nomeVal = document.getElementById("modalidade_nome_formulario").value;
  const descricaoVal = document.getElementById("modalidade_descricao_formulario").value;
  const novaModalidade = { nome: nomeVal, descricao: descricaoVal };

  try {
    await fetch(`${API_BASE_URL}/modalidades`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaModalidade),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaModalidade(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar modalidade:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaModalidade(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/modalidades");
    const modalidadesBD = await response.json(); 

    const modalidades = modalidadesBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
        depedenciaTurma: null
      };
    });

    const res = await fetch(API_BASE_URL + "/turmas");
    const turmasBD = await res.json(); 

    const turmas = turmasBD.map((row) => {
      return {
        modalidade: row.modalidade
      };
    });

    
       

    componentePrincipal.innerHTML = modalidadeView.renderizarTabela(modalidades, turmas);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar modalidades:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const modalidadeId = this.getAttribute("modalidade-id");
      excluirModalidade(modalidadeId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const modalidadeId = this.getAttribute("modalidade-atualizar-id");
      buscarModalidade(modalidadeId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirModalidade(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/modalidades/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a modalidade");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaModalidade(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a modalidade:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
//onde parei 01/01 14:55
async function buscarModalidade(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/modalidades/${id}`);
    const modalidadesBD = await response.json();
    if (modalidadesBD.length <= 0) return;

    const modalidade = modalidadesBD.map(row => ({
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
    }))[0];


    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = modalidadeView.renderizarFormularioAtualizar(modalidade);
    document.getElementById("formulario_modalidade_atualizar").addEventListener("submit", atualizarModalidade);
  } catch (error) {
    console.error("Erro ao buscar modalidades:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarModalidade(event) {
  event.preventDefault();

  const idVal = document.getElementById("modalidade_id_formulario").value;
  const nomeVal = document.getElementById("modalidade_nome_formulario").value;
  const descricaoVal = document.getElementById("modalidade_descricao_formulario").value;
  const modalidade = {id: idVal, nome: nomeVal, descricao: descricaoVal,};

  try {
    const response = await fetch(`${API_BASE_URL}/modalidades`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(modalidade),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a modalidade");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaModalidade(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar modalidade:", error);
  }
}

const ModalidadeController = {
  renderizarModalidadeFormulario,
  cadastrarModalidade,
  renderizarListaModalidade,
  excluirModalidade,
};

export default ModalidadeController;
