export function getAdoçãoConfirmationEmailTemplate(nome, petNome) {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Confirmação de Adoção</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </head>
    <body
      style="
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: #ffffff;
        font-size: 14px;
      "
    >
      <div
        style="
          max-width: 680px;
          margin: 0 auto;
          padding: 45px 30px 60px;
          background: #f4f7ff;
          font-size: 14px;
          color: #434343;
        "
      >
        <header>
          <h1 style="text-align: center; color: #0c4a6e; margin-bottom: 20px;">
            Adoção Confirmada!
          </h1>
        </header>
        <main>
          <div
            style="
              margin: 0;
              padding: 30px;
              background: #ffffff;
              border-radius: 10px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            "
          >
            <p style="font-size: 18px; font-weight: 500; color: #1f1f1f;">
              Olá ${nome}, sua adoção foi confirmada!
            </p>
            <p style="margin: 16px 0; font-weight: 400; color: #555555;">
              Parabéns por escolher o <strong>${petNome}</strong> como seu novo
              companheiro de vida. Estamos muito felizes por você fazer parte
              da nossa família de adotantes responsáveis!
            </p>
            <p
              style="
                margin: 16px 0;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Em breve, entraremos em contato para orientar você sobre os
              próximos passos.
            </p>
            <a
              href="https://amipets.com.br"
              style="
                display: inline-block;
                background-color: #0c4a6e;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                margin-top: 20px;
              "
              >Conheça Mais Animais</a
            >
          </div>
        </main>
        <footer style="margin-top: 40px; text-align: center; font-size: 14px; color: #555555;">
          <p>AmiPets - Onde o Amor e a Adoção se Encontram</p>
          <p>
            <a href="mailto:amipetsz@gmail.com" style="color: #0c4a6e; text-decoration: none;">amipetsz@gmail.com</a>
          </p>
          <p>© 2024 AmiPets. Todos os direitos reservados.</p>
        </footer>
      </div>
    </body>
  </html>
  `;
}
