/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */

//n me perder: .tarefa_titulo_formulario
function renderizarFormulario() {
  return `
          <form class="mt-3" id="formulario_turma">
              <div class="form-group">
                  <label for="turma_nome">Nome:</label>
                  <input type="text" class="form-control" id="turma_nome_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_carga">Carga:</label>
                  <input type="time" class="form-control" id="turma_carga_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_valor">Valor:</label>
                  <input type="text" class="form-control" id="turma_valor_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_turno">Turno:</label>
                  <select type="text" class="form-select" id="turma_turno_formulario">
                  <option selected>(Escolha)</option>
                  <option value="1"> Matutino </option>
                  <option value="2"> Vespertino </option>
                  <option value="3"> Noturno </option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="turma_treinador">Treinador:</label>
                  <input type="text" class="form-control" id="turma_treinador_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_modalidade">Modalidade:</label>
                  <input type="text" class="form-control" id="turma_modalidade_formulario">
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} tarefa - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(tarefa) {
    return `
            <form class="mt-3" id="formulario_tarefa_atualizar">
                <input type="hidden" class="form-control" id="tarefa_id_formulario" value="${tarefa.id}">
                <div class="form-group">
                    <label for="tarefa_titulo">Título da tarefa:</label>
                    <input type="text" class="form-control" id="tarefa_titulo_formulario" value="${tarefa.titulo}">
                </div>
                <div class="form-group">
                    <label for="tarefa_descricao">Descrição:</label>
                    <textarea class="form-control" id="tarefa_descricao_formulario">${tarefa.descricao}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>

            <form class="mt-3" id="formulario_turma_atualizar">
            <input type="hidden" class="form-control" id="tarefa_id_formulario" value="${turma.id}">
              <div class="form-group">
                  <label for="turma_nome">Nome:</label>
                  <input type="text" class="form-control" id="turma_nome_formulario" value="${turma.i}">
              </div>
              <div class="form-group">
                  <label for="turma_carga">Carga:</label>
                  <input type="time" class="form-control" id="turma_carga_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_valor">Valor:</label>
                  <input type="text" class="form-control" id="turma_valor_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_turno">Turno:</label>
                  <select type="text" class="form-select" id="turma_turno_formulario">
                  <option selected>(Escolha)</option>
                  <option value="1"> Matutino </option>
                  <option value="2"> Vespertino </option>
                  <option value="3"> Noturno </option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="turma_treinador">Treinador:</label>
                  <input type="text" class="form-control" id="turma_treinador_formulario">
              </div>
              <div class="form-group">
                  <label for="turma_modalidade">Modalidade:</label>
                  <input type="text" class="form-control" id="turma_modalidade_formulario">
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} tarefas - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(tarefas) {
  let tabela = `
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Título da tarefa</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  tarefas.forEach((tarefa) => {
    tabela += `
              <tr>
                  <td>${tarefa.titulo}</td>
                  <td>${tarefa.descricao}</td>
                  <td>
                    <button class="excluir-btn" tarefa-id=${tarefa.id}>Excluir</button>
                    <button class="atualizar-btn" tarefa-atualizar-id=${tarefa.id}>Atualizar</button>
                  </td>
              </tr>
          `;
  });

  tabela += `
              </tbody>
          </table>
      `;

  return tabela;
}

const TarefaView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default TarefaView;
