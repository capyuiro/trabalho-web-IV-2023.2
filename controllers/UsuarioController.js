const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsulta(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as tarefas
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM usuarios', [], res, "Erro na consulta de usuarios");
});

// Rota para buscar uma tarefa específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM usuarios WHERE id = ?', [id], res, "Erro na consulta de usuario");
});

// Rota para criar uma nova tarefa
router.post('/', (req, res) => {
  const { nome, email, senha, data_de_nasc } = req.body;
  executarConsulta('INSERT INTO usuarios (nome, email, senha, data_de_nasc) VALUES ( ?, ?, ? ,?)', [ nome, email, senha, data_de_nasc], res, "Erro no cadastro de usuario!");
});

// Rota para deletar uma tarefa
router.delete("/:id", (req, res) => {
  const usuarioId = req.params.id;
  executarConsulta('DELETE FROM usuarios WHERE id = ?', [usuarioId], res, 'Erro ao deletar usuario');
});

// Rota para atualizar uma tarefa
router.put('/', (req, res) => {
  const { nome, email, senha, data_de_nasc, id } = req.body;
  executarConsulta('UPDATE usuarios SET email = ?, senha = ?, data_de_nasc = ? WHERE id = ?', [id, nome, email, senha, data_de_nasc, id], res, "Erro ao atualizar usuario");
});

module.exports = router;