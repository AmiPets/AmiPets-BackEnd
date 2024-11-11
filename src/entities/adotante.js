import bcrypt from 'bcryptjs';

class Adotante {
  constructor({ id, nome, email, telefone, endereco, isAdmin = false }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
    this.isAdmin = isAdmin;
  }

  async setSenha(senha) {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(senha, salt);
  }

  async verificarSenha(senha) {
    return await bcrypt.compare(senha, this.senha);
  }
}

export default Adotante;