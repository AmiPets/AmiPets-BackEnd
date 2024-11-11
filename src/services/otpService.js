import sendEmail from './emailService.js';
import getOtpEmailTemplate from '../utils/templates/otpEmailTemplate.js';

const otpStore = {};
const OTP_EXPIRATION = 5 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 10 * 60 * 1000;

const otpService = {
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  async sendOTP(email, nome) {
    const now = Date.now();
    let userRecord = otpStore[email];

    if (!userRecord) {
      userRecord = otpStore[email] = { attempts: 0, otp: '', expirationTime: 0, isBlocked: false, blockedUntil: 0 };
    }

    if (userRecord.isBlocked && now < userRecord.blockedUntil) {
      throw new Error("Você excedeu o limite de tentativas. Tente novamente mais tarde.");
    }

    if (userRecord.isBlocked && now >= userRecord.blockedUntil) {
      userRecord.attempts = 0;
      userRecord.isBlocked = false;
    }

    userRecord.attempts += 1;
    if (userRecord.attempts > MAX_ATTEMPTS) {
      userRecord.isBlocked = true;
      userRecord.blockedUntil = now + BLOCK_DURATION;
      throw new Error("Você excedeu o limite de tentativas. Tente novamente mais tarde.");
    }

    const otp = this.generateOTP();
    const expirationTime = now + OTP_EXPIRATION;

    userRecord.otp = otp;
    userRecord.expirationTime = expirationTime;

    const subject = "Seu código de verificação";
    const html = getOtpEmailTemplate(nome, otp);

    try {
      await sendEmail(email, subject, html);
      console.log(`OTP enviado para ${email}: ${otp}`);
    } catch (error) {
      console.error(`Erro ao enviar OTP para ${email}:`, error);
      throw new Error("Erro ao enviar OTP.");
    }
  },

  async verifyOTP(email, otp) {
    const record = otpStore[email];

    if (!record) {
      return { valid: false, message: "Código OTP não encontrado. Solicite um novo código." };
    }

    if (Date.now() > record.expirationTime) {
      delete otpStore[email];
      return { valid: false, message: "Código OTP expirou. Solicite um novo código." };
    }

    if (record.otp !== otp) {
      return { valid: false, message: "Código OTP inválido. Tente novamente." };
    }

    delete otpStore[email];
    return { valid: true, message: "Código OTP verificado com sucesso." };
  },
};

export default otpService;
