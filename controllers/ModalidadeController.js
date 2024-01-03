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
  executarConsulta('SELECT * FROM modalidade', [], res, "Erro na consulta de modalidade");
});

// Rota para buscar uma tarefa específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM modalidade WHERE id = ?', [id], res, "Erro na consulta de modalidade");
});

// Rota para criar uma nova tarefa
router.post('/', (req, res) => {
  const { nome, descricao } = req.body;
  executarConsulta('INSERT INTO modalidade (nome, descricao) VALUES (?, ?)', [nome, descricao], res, "Erro no cadastro de modalidade!");
});

// Rota para deletar uma tarefa
router.delete("/:id", (req, res) => {
  const modalidadeId = req.params.id;
  executarConsulta('DELETE FROM modalidade WHERE id = ?', [modalidadeId], res, 'Erro ao deletar modalidade');
});

// Rota para atualizar uma tarefa
router.put('/', (req, res) => {
  const { id, nome, descricao } = req.body;
  executarConsulta('UPDATE modalidade SET nome = ?, descricao = ? WHERE id = ?', [nome, descricao, id], res, "Erro ao atualizar modalidade");
});

module.exports = router;