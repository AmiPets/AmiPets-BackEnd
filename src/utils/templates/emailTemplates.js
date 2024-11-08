const getWelcomeEmailTemplate = (nome) => {
  return `
    <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Bem-vindo ao AmiPets!</title>

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
        padding: 45px 30px 0px;
        background: #f4f7ff;
        background-image: url(https://img.freepik.com/free-photo/beautiful-pet-portrait-dog-with-food_23-2149218453.jpg?t=st=1730929305~exp=1730932905~hmac=604bdc38b19ec41f60edf2408924b03aa7738212f591f3ee2b4f85a5ff031195&w=2000);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%">
          <tbody>
            <tr style="height: 0">
              <td>
                <img
                  alt=""
                  src="https://img.icons8.com/?size=100&id=WZqisXRG_r86&format=png&color=FA5252"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 0 ;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
            Bem-vindo ao AmiPets, ${nome}!
          </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
            Estamos muito felizes em tê-lo conosco no AmiPets! Nossa missão é
            conectar você ao seu novo amigo de estimação, promovendo adoções
            responsáveis e proporcionando uma experiência acolhedora.
          </p>
          <p
          style="
          margin: 0;
          margin-top: 17px;
          font-weight: 500;
          letter-spacing: 0.56px;
        ">
            Para começar, recomendamos explorar nossa página de adoção e conhecer
            os animais que estão esperando por um lar cheio de amor!
            </p>

            
        <p
        style="
          max-width: 400px;
          margin: 0 auto;
          margin-top: 17px;
          text-align: center;
          font-weight: 500;
          color: #8c8c8c;
        "
      >
      Se tiver dúvidas ou precisar de assistência, nossa equipe está aqui
      para ajudar a encontrar o pet perfeito para você!
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
        margin-top: 16px;
        text-align: center;
      "
      >Conheça nossos Animais</a
    >
  </div>
            
          </div>
        </div>

      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 10px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
        AmiPets - Onde o Amor e a Adoção se Encontram
        </p>
        <p>
          <a href="https://amipets.com.br" style="color: #0c4a6e; text-decoration: none;"
            >amipets.com.br</a
          >
          |
          <a
            href="mailto:amipetsz@gmail.com"
            style="color: #0c4a6e; text-decoration: none;"
            >amipetsz@gmail.com</a
          >
        </p>
        <p style="margin: 0; margin-top: 16px; color: #434343">
          © 2024 AmiPets. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  </body>
</html>
  `;
};

export default getWelcomeEmailTemplate;