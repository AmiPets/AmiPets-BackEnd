const getWelcomeEmailTemplate = (nome) => {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bem-vindo ao AmiPets!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .logo {
          display: block;
          margin: 0 auto 20px;
          text-align: center;
        }
        .header {
          background-color: #0c4a6e; 
          color: #ffffff;
          padding: 20px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          color: #333333;
          line-height: 1.6;
        }
        .content p {
          margin: 0 0 16px;
        }
        .cta-button {
          display: inline-block;
          background-color: #0c4a6e; 
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          margin-top: 16px;
          text-align: center;
        }
        .cta-button:hover {
          background-color: #082f49; 
        }
        .footer {
          text-align: center;
          color: #777777;
          font-size: 12px;
          padding: 20px;
          border-top: 1px solid #eeeeee;
        }
        .footer p {
          margin: 0;
        }
        .footer a {
          color: #0c4a6e; 
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">😺🐶</div>
        <div class="header">
          <h1>Bem-vindo ao AmiPets, ${nome}!</h1>
        </div>
        <div class="content">
          <p>Olá, ${nome}!</p>
          <p>
            Estamos muito felizes em tê-lo conosco no AmiPets! Nossa missão é
            conectar você ao seu novo amigo de estimação, promovendo adoções
            responsáveis e proporcionando uma experiência acolhedora.
          </p>
          <p>
            Para começar, recomendamos explorar nossa página de adoção e conhecer
            os animais que estão esperando por um lar cheio de amor!
          </p>
          <p>
            Se tiver dúvidas ou precisar de assistência, nossa equipe está aqui
            para ajudar a encontrar o pet perfeito para você!
          </p>
          <a href="https://amipets.com.br" class="cta-button">
            Conheça nossos Animais
          </a>
        </div>
        <div class="footer">
          <p>AmiPets - Onde o Amor e a Adoção se Encontram</p>
          <p>
            <a href="https://amipets.com.br">amipets.com.br</a> |
            <a href="mailto:amipetsz@gmail.com">amipetsz@gmail.com</a>
          </p>
          <p>© 2024 AmiPets. Todos os direitos reservados.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

export default getWelcomeEmailTemplate;