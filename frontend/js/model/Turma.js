export class Turma {
  constructor(nome, carga, turno, valor, treinador, modalidade) {
      this._nome = nome;
      this._carga = carga;
      this._turno = turno;
      this._valor = valor;
      this._treinador = treinador;
      this._modalidade = modalidade;
  }

  set nome(nome){
    this._nome = nome;
  }

  set carga(carga){
    this._carga = carga;
  }

  set turno(turno){
    this._turno = turno ;
  }

  set valor(valor){
    this._valor = valor;
  }

  set treinador(treinador){
    this._treinador = treinador ;
  }

  set modalidade(modalidade){
    this._modalidade = modalidade ;
  }

  set usuario (usuario){
    this._usuario = usuario ;
  }

  get nome(){
    return this._nome;
  }

  get carga(){
    return this._carga;
  }  

  get turno(){
    return this._turno;
  }

  get valor(){
    return this._valor;
  }  

  get treinador(){
    return this._treinador;
  }

  get modalidade(){
    return this._modalidade;
  }  

  get usuario(){
    return this._usuario;
  }   

}