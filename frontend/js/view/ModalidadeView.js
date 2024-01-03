/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
            <h5>Cadastrar nova modalidade</h5>
          <form class="mt-3" id="formulario_modalidade">
              <div class="form-group">
                  <label for="modalidade_nome">Nome:</label>
                  <input type="text" class="form-control" id="modalidade_nome_formulario">
              </div>
              <div class="form-group">
                  <label for="modalidade_descricao">Descrição:</label>
                  <textarea class="form-control" id="modalidade_descricao_formulario"></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
      `;
}

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} modalidade - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(modalidade) {
    return `
            <h5>Alterar modalidade "${modalidade.nome}"</h5>
            <form class="mt-3" id="formulario_modalidade_atualizar">
                <input type="hidden" class="form-control" id="modalidade_id_formulario" value="${modalidade.id}">
                <div class="form-group">
                    <label for="modalidade_nome">Nome:</label>
                    <input type="text" class="form-control" id="modalidade_nome_formulario" value="${modalidade.nome}">
                </div>
                <div class="form-group">
                    <label for="modalidade_descricao">Descrição:</label>
                    <textarea class="form-control" id="modalidade_descricao_formulario">${modalidade.descricao}</textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} modalidades
 * @param {Array} turmas - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(modalidades, turmas) {
    
    function verificarDependencia(modalidade) {
        turmas.forEach((turma) => {
                if(modalidade.id == turma.modalidade) {
                    return modalidade.depedenciaTurma = 1;
                } 
        });
    }

    function btnExcluir(sentenca, idModalidade) {
        if(sentenca == 1) {
            return `<button class="excluir-btn btn btn-danger" disabled modalidade-id=${idModalidade}>Excluir</button>`;
        } else {
            return `<button class="excluir-btn btn btn-danger" modalidade-id=${idModalidade}>Excluir</button>`;
        }
    }
  let tabela = `
          <h5>Lista de modalidades</h5>
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
      `;

  modalidades.forEach((modalidade) => {
    verificarDependencia(modalidade);
    tabela += `
              <tr>
                  <td>${modalidade.nome}</td>
                  <td>${modalidade.descricao}</td>
                  <td>
                    ${btnExcluir(modalidade.depedenciaTurma, modalidade.id)}
                    <button class="atualizar-btn btn btn-outline-secondary" modalidade-atualizar-id=${modalidade.id}>Atualizar</button>
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

const ModalidadeView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default ModalidadeView;
