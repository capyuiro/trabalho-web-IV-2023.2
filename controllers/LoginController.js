const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const router = express.Router();

// Obtém a senha do banco de dados a partir de variáveis de ambiente ou usa um valor padrão vazio.
const senhaBanco = process.env.SENHA_BANCO || "";

// Cria a configuração de conexão com o banco de dados.
const bd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: senhaBanco,
  database: 'bd'
});

// Rota para realização de login
router.post('/', async (req, res) => {
  // Obtenha usuário e senha do corpo da requisição  
  const { usuario, senha } = req.body;

  console.log(usuario);
  console.log(senha);

  console.log("------------");

  const response = await fetch("http://127.0.0.1:3000" + "/usuarios");
    const usuariosBD = await response.json(); 

    const usuarios = usuariosBD.map((row) => {
      return {
        email: row.email,
        senha: row.senha
      };
    });
    console.log(usuarios);

    let senhaUsuario = null;
    let emailUsuario = null;
    for(let x = 0;x < usuarios.length; x++){
      if(usuario == usuarios[x].email){
        emailUsuario = usuarios[x].email;
        senhaUsuario = usuarios[x].senha;

      }
    };
    const usuarioBanco = {
      id: emailUsuario,
      senha: senhaUsuario
    }
    console.log(usuarioBanco);
  

  console.log("------------");
  // Aqui, seria necessário buscar o usuário do banco de dados  
  

  // Verifique a senha
  //if (bcrypt.compareSync(senha, usuarioBanco.senha)) {
  if (usuario == usuarioBanco.id && senha == usuarioBanco.senha){
    // Senha correta, crie um token
    const token = jwt.sign({ id: usuarioBanco.id }, 'IFRN_AUTORIA_WEB', { expiresIn: '1h' });
    res.json({ token });
  } else {
    // Senha incorreta
    res.status(401).json({erro : "Credenciais inválidas"});
  
    console.log("erro");
  }

});

module.exports = router;
