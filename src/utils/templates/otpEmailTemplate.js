export function getOtpEmailTemplate(nome, otp) {
  return `
    <html>
      <body>
        <h1>Bem-vindo ao AmiPets, ${nome}!</h1>
        <p>Seu código OTP é: <strong>${otp}</strong></p>
        <p>Estamos muito felizes em tê-lo conosco no AmiPets! Nossa missão é conectar você ao seu novo amigo de estimação, promovendo adoções responsáveis e proporcionando uma experiência acolhedora.</p>
        <p>Para começar, recomendamos explorar nossa página de adoção e conhecer os animais que estão esperando por um lar cheio de amor!</p>
        <p>Se tiver dúvidas ou precisar de assistência, nossa equipe está aqui para ajudar a encontrar o pet perfeito para você!</p>
        <p><a href="#">Conheça nossos Animais</a></p>
      </body>
    </html>
  `;
};

export default getOtpEmailTemplate;