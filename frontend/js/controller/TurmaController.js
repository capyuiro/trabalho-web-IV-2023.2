import turmaView from "../view/TurmaView.js";
import { API_BASE_URL } from "../config/config.js";


/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
async function renderizarTurmaFormulario(componentePrincipal) {
  const response = await fetch(API_BASE_URL + "/modalidades");
  const modalidadesBD = await response.json(); 

  const modalidades = modalidadesBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
      };
  });

  componentePrincipal.innerHTML = turmaView.renderizarFormulario(modalidades);
  document.getElementById("formulario_turma").addEventListener("submit", cadastrarTurma);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarTurma(event) {
  event.preventDefault();
  const nomeVal = document.getElementById("turma_nome_formulario").value;
  const cargaVal = document.getElementById("turma_carga_formulario").value;
  const turnoVal = document.getElementById("turma_turno_formulario").value;
  const valorVal = document.getElementById("turma_valor_formulario").value;
  const treinadorVal = document.getElementById("turma_treinador_formulario").value;
  const modalidadeVal = document.getElementById("turma_modalidade_formulario").value;
  
  
  const novaTurma = { nome: nomeVal, carga: cargaVal, turno: turnoVal, valor: valorVal, treinador: treinadorVal, modalidade: modalidadeVal };

  

  try {
    await fetch(`${API_BASE_URL}/turmas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTurma),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaTurmas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar turma:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * titulo
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaTurmas(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/turmas");
    const turmasBD = await response.json(); 

    const turmas = turmasBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        carga: row.carga,
        turno: row.turno,
        valor: row.valor,
        treinador: row.treinador,
        modalidade: row.modalidade,
        nome_modalidade: null
      };
    });
    for(let x = 0; x < turmas.length; x++) {
              const responseModalidade = await fetch(`${API_BASE_URL}/modalidades/${turmas[x].modalidade}`);
              const modalidadesBD = await responseModalidade.json();

              const modalidade = modalidadesBD.map((row) => {
                  return {nome_modalidade: row.nome};
              });

              turmas[x].nome_modalidade = modalidade[0].nome_modalidade;
    };

    console.log(turmas);
    
    componentePrincipal.innerHTML = turmaView.renderizarTabela(turmas);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
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
      const turmaId = this.getAttribute("turma-id");
      excluirTurma(turmaId);
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
      const turmaId = this.getAttribute("turma-atualizar-id");
      buscarTurma(turmaId);
    });
  });
}
/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirTurma(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/turmas/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a turma");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTurmas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a turma:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarTurma(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/turmas/${id}`);
    const turmasBD = await response.json();
    if (turmasBD.length <= 0) return;

    const turma = turmasBD.map(row => ({
        id: row.id,
        nome: row.nome,
        carga: row.carga,
        turno: row.turno,
        valor: row.valor,
        treinador: row.treinador,
        modalidade: row.modalidade
    }))[0];

    const responseModalidade = await fetch(`${API_BASE_URL}/modalidades/${turma.modalidade}`);
    const modalidadesAtualizarBD = await responseModalidade.json();
    if (turmasBD.length <= 0) return;

    const modalidade = modalidadesAtualizarBD.map(row => ({
        id: row.id,
        nome: row.nome,
        descricao: row.descricao
    }))[0];

    const res = await fetch(API_BASE_URL + "/modalidades");
    const modalidadesBD = await res.json(); 

    const modalidades = modalidadesBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
      };
  });

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = turmaView.renderizarFormularioAtualizar(turma, modalidade, modalidades);
    document.getElementById("formulario_turma_atualizar").addEventListener("submit", atualizarTurma);
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarTurma(event) {
  event.preventDefault();

  const idVal = document.getElementById("turma_id_formulario").value;
  const nomeVal = document.getElementById("turma_nome_formulario").value;
  const cargaVal = document.getElementById("turma_carga_formulario").value;
  const turnoVal = document.getElementById("turma_turno_formulario").value;
  const valorVal = document.getElementById("turma_valor_formulario").value;
  const treinadorVal = document.getElementById("turma_treinador_formulario").value;
  const modalidadeVal = document.getElementById("turma_modalidade_formulario").value;

  const turma = { id: idVal, nome: nomeVal, carga: cargaVal, turno: turnoVal, valor: valorVal, treinador: treinadorVal, modalidade: modalidadeVal };

  try {
    const response = await fetch(`${API_BASE_URL}/turmas`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(turma),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a turma");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaTurmas(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
  }
}

const TurmaController = {
  renderizarTurmaFormulario,
  cadastrarTurma,
  renderizarListaTurmas,
  excluirTurma,
};

export default TurmaController;
