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
  executarConsulta('SELECT * FROM turma', [], res, "Erro na consulta de turma");
});

// Rota para buscar uma tarefa específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM turma WHERE id = ?', [id], res, "Erro na consulta de turma");
});

// Rota para criar uma nova tarefa
router.post('/', (req, res) => {
  const { nome, carga, turno, valor, treinador, modalidade } = req.body;
  executarConsulta('INSERT INTO turma (nome, carga, turno, valor, treinador, modalidade ) VALUES (?, ?, ?, ? ,? ,?)', [nome, carga, turno, valor, treinador, modalidade], res, "Erro no cadastro de turma!");
});

// Rota para deletar uma tarefa
router.delete("/:id", (req, res) => {
  const turmaId = req.params.id;
  executarConsulta('DELETE FROM turma WHERE id = ?', [turmaId], res, 'Erro ao deletar turma');
});

// Rota para atualizar uma tarefa
router.put('/', (req, res) => {
  const { id, nome, carga, turno, valor, treinador, modalidade } = req.body;
  executarConsulta('UPDATE turma SET nome = ?, carga = ?, turno = ?, valor = ?, treinador = ?, modalidade = ? WHERE id = ?', [nome, carga, turno, valor, treinador, modalidade, id], res, "Erro ao atualizar turma");
});

module.exports = router;