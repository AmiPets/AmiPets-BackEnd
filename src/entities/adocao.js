import StatusAdocao from '../enums/statusAdocao.js';

class Adocao {
  constructor({ id, dataAdocao, adotanteId, petId, status }) {
    this.id = id;
    this.dataAdocao = dataAdocao || new Date();
    this.adotanteId = adotanteId;
    this.petId = petId;
    this.status = status || StatusAdocao.SOLICITACAO_ENVIADA;
  }
}

export default Adocao;
