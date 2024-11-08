class Pet {
  constructor({
    id,
    nome,
    especie,
    dataNascimento,
    descricao,
    status,
    tamanho,
    personalidade,
    adocaoId,
    foto,
  }) {
    this.id = id;
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.descricao = descricao;
    this.status = status || 'disponível';
    this.tamanho = tamanho;
    this.personalidade = personalidade;
    this.adocaoId = adocaoId;
    this.foto = foto;
  }
}
export default Pet;
