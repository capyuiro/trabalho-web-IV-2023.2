
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mysql = require('mysql');

//Rotas
const tarefasRouter = require('./controllers/TarefaController');
const loginRouter = require('./controllers/LoginController');
const turmaRouter = require('./controllers/TurmaController');
const modalidadeRouter = require('./controllers/ModalidadeController');
const usuarioRouter = require('./controllers/UsuarioController');

dotenv.config( { path: './.env'});

const senhaBanco = process.env.SENHA_BANCO || "";

const bd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: senhaBanco,
  database: 'bd'
});

bd.connect( (error) =>{
  if(error){
    console.log(error)
  }
  else{
    console.log("mysql ok no app.js")
  }
});

// Cria uma instância do servidor Express.
const app = express();

// Aplica o middleware para parsear JSON no corpo das requisições.
app.use(express.json());

// Habilita o CORS para permitir requisições de diferentes origens.
app.use(cors());

// Define a rota "/tarefas" e associa ao router importado.
app.use("/tarefas", tarefasRouter);
app.use("/login", loginRouter);
app.use("/turmas", turmaRouter);
app.use("/modalidades", modalidadeRouter);
app.use("/usuarios", usuarioRouter);

// Define a porta do servidor, com um fallback para a porta 3000 se não estiver definida.
const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta especificada.
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});