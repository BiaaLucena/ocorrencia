export class Professor {
  nome: string;
  sobrenome: string;
  matricula: number;
  disciplina: string;
  senha: string; 

  constructor(nome: string, sobrenome: string, matricula: number, disciplina: string, senha: string) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.matricula = matricula;
    this.disciplina = disciplina;
    this.senha = senha;
  }
}

