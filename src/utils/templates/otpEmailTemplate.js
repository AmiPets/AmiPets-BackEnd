export function getOtpEmailTemplate(nome, otp) {
  return `
  <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>OTP AmiPets</title>

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
        background-image: url(https://img.freepik.com/free-photo/adorable-brown-white-basenji-dog-smiling-giving-high-five-isolated-white_346278-1657.jpg?t=st=1730923756~exp=1730927356~hmac=303813f5e96c19a2fe559959c670846dfb15d1611f5b3235846fd796c20c74e7&w=740);
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
              <td style="text-align: right">
                <span id="datetime" style="font-size: 16px; line-height: 30px; color: #ffffff"></span>
                  ></span
                >
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
            padding: 92px 30px 115px;
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
              Seu OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Olá ${nome}!,
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Use o seguinte código para concluir a atualização do seu endereço
              de e-mail. O código é válido por
              <span style="font-weight: 600; color: #1f1f1f">5 minutos</span>.
              Não compartilhe este código com ninguém, nem mesmo com
              funcionários do AmiPets.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #FA5252;
              "
            >
              ${otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Precisa de ajuda? Fale com a gente pelo e-mail
          <a
            href="mailto:amipetsz@gmail.com"
            style="color: #FA5252; text-decoration: none"
            >amipetsz@gmail.com</a
          >
          ou visite nosso
          <a
            href="https://amipets.com.br"
            target="_blank"
            style="color: #FA5252; text-decoration: none"
            >Centro de Ajuda.
          </a>
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
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
          AmiPets
        </p>
        <div style="margin: 0; margin-top: 16px">
          <a
            href="https://github.com/AmiPets"
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://img.icons8.com/?size=100&id=EBCun1ZMi1Jt&format=png&color=000000"
          /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343">
          © 2024 AmiPets. Todos os direitos reservados.
        </p>
      </footer>
    </div>
    <script>
      let now = new Date();
      
      let options = { day: '2-digit', month: 'short', year: 'numeric' };
      let formattedDate = now.toLocaleDateString('en-GB', options).replace(',', '');
    
      document.getElementById("datetime").innerHTML = formattedDate;
    </script>
    
  </body>
</html>
  `;
};

export default getOtpEmailTemplate;