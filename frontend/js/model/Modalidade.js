export class Modalidade {
  constructor(nome, descricao) {
      this._nome = nome;
      this._descricao = descricao;
      this._usuario = null
  }

  set nome(nome){
    this._nome = nome;
  }

  set descricao (descricao){
    this._descricao = descricao ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }

  get nome(){
    return this._nome;
  }

  get descricao(){
    return this._descricao;
  }  

  get usuario(){
    return this._usuario;
  }   

}