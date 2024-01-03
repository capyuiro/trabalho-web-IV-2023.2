/**
 * Renderiza o formulário para criar uma nova tarefa.
// @param {Array} modalidades - Lista de tarefas a serem exibidas.
 * @return {string} HTML do formulário de criação de tarefa.
 */

//n me perder: .tarefa_titulo_formulario
function renderizarFormulario(modalidades) { //add OK
    let formulario = `
    <h5>Cadastrar nova turma</h5>
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
                <select type="text" class="form-select" id="turma_modalidade_formulario">
                <option selected>(Escolha)</option>`;

        modalidades.forEach((modalidade) => { formulario += `
                    <option value="${modalidade.id}">${modalidade.nome}</option>
                `;
        });

        formulario += `
        </select>
            </div>
        <button type="submit" class="btn btn-primary mt-2">Salvar</button>
    </form>
        `;
        return formulario;
};

/**
 * Renderiza o formulário para atualizar uma tarefa existente.
 * @param {Object} turma
 * @param {Array} modalidades
 * @param {Object} modalidade - A tarefa a ser atualizada.
 * @return {string} HTML do formulário de atualização de tarefa.
 */
function renderizarFormularioAtualizar(turma, modalidade, modalidades) {
    function nomeTurno(id) {
        if (id == 1) {
            return "Matutino";
        } else if (id == 2) {
            return "Vespertino";
        } else if(id == 3) {
            return "Noturno";
        }
    };
    let formulario = `
            <h5>Alterar turma "${turma.nome}"</h5>
            <form class="mt-3" id="formulario_turma_atualizar">
            <input type="hidden" class="form-control" id="turma_id_formulario" value="${turma.id}">
              <div class="form-group">
                  <label for="turma_nome">Nome:</label>
                  <input type="text" class="form-control" id="turma_nome_formulario" value="${turma.nome}">
              </div>
              <div class="form-group">
                  <label for="turma_carga">Carga:</label>
                  <input type="time" class="form-control" id="turma_carga_formulario" value="${turma.carga}">
              </div>
              <div class="form-group">
                  <label for="turma_valor">Valor:</label>
                  <input type="text" class="form-control" id="turma_valor_formulario" value="${turma.valor}">
              </div>
              <div class="form-group">
                  <label for="turma_turno">Turno:</label>
                  <select type="text" class="form-select" id="turma_turno_formulario">
                    <option value = "${turma.turno}" selected> ${nomeTurno(turma.turno)} </option>
                  <option value="1"> Matutino </option>
                  <option value="2"> Vespertino </option>
                  <option value="3"> Noturno </option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="turma_treinador">Treinador:</label>
                  <input type="text" class="form-control" id="turma_treinador_formulario" value="${turma.treinador}">
                </div>
                  <div class="form-group">
                    <label for="turma_modalidade">Modalidade:</label>
                    <select type="text" class="form-select" id="turma_modalidade_formulario">
                            <option selected value="${modalidade.id}">${modalidade.nome}</option>
                  `;

        modalidades.forEach((modalidade) => { formulario += `
                    <option value="${modalidade.id}">${modalidade.nome}</option>
                `;
        });

        formulario += `
                    </select>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </form>
        `;

        return formulario;
}

  /**
 * Renderiza a tabela de tarefas.
 * @param {Array} turmas
 * @param {Array} modalidades - Lista de tarefas a serem exibidas.
 * @return {string} HTML da tabela de tarefas.
 */
function renderizarTabela(turmas) {
    function nomeTurno(id) {
        if (id == 1) {
            return "Matutino";
        } else if (id == 2) {
            return "Vespertino";
        } else if(id == 3) {
            return "Noturno";
        }
    };
  let tabela = `
          <h5>Lista de turmas</h5>
          <table class="table table-striped mt-3">
              <thead>
                  <tr>
                      <th>Nome</th>
                      <th>Carga Horária</th>
                      <th>Valor</th>
                      <th>Turno</th>
                      <th>Treinador</th>
                      <th>Modalidade</th>
                      <th> Operações </th>
                  </tr>
              </thead>
              <tbody>
              `;
    turmas.forEach((turma) => {
    tabela += `
                <tr>
                <td>${turma.nome}</td>
                    <td>${turma.carga}</td>
                    <td>${turma.valor}</td>
                    <td>${nomeTurno(turma.turno)}</td>
                    <td>${turma.treinador}</td>
                    <td>${turma.nome_modalidade}</td>
                    <td>
                    <button class="excluir-btn btn btn-danger" turma-id=${turma.id}>Excluir</button>
                    <button class="atualizar-btn btn btn-outline-secondary" turma-atualizar-id=${turma.id}>Atualizar</button>
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

const TurmaView = {
    renderizarFormulario,
    renderizarTabela,
    renderizarFormularioAtualizar
};

export default TurmaView;
