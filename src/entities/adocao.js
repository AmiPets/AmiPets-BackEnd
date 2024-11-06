class Adocao {
  constructor({ id, dataAdocao, adotanteId, petId }) {
    this.id = id;
    this.dataAdocao = dataAdocao || new Date();
    this.adotanteId = adotanteId;
    this.petId = petId;
  }
}

export default Adocao;
