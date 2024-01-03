/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
  return `
  <form id="login-form">
  <div>
    <label for="cadastro_formulario_nome">Nome:</label>
    <input type="text" id="cadastro_formulario_nome" required>
  </div>
  <div>
    <label for="cadastro_formulario_email">Email:</label>
    <input type="email" id="cadastro_formulario_email" required>
  </div>
  <div>
    <label for="cadastro_formulario_dataNasc">Data de nascimento:</label>
    <input type="date" id="cadastro_formulario_dataNasc" required>
  </div>
  <div>
    <label for="cadastro_formulario_senha">Senha:</label>
    <input type="password" id="cadastro_formulario_senha" required>
  </div>
  <button id="cadastro_form" type="submit">Cadastrar</button>
</form>
      `;
}

/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormularioLogin() {
    return `
    <form id="login-form">
        <input type="text" id="usuario" placeholder="Email de usuário" required>
        <input type="password" id="senha" placeholder="Senha" required>
        <button type="submit">Login</button>
        <br>
        <br>
        <p>Não apresenta login? <a href="#" id="cadastro">Cadastrar</a></p>
    </form>
        `;
  }



const usuarioView = {
    renderizarFormularioLogin,
    renderizarFormulario
};

export default usuarioView;
