import { transporter } from "../libs/nodemailer";

async function sendEmail(email: string, token: string): Promise<void> {
  // Cek apakah email dan token valid
  if (!email || !token) {
    throw new Error("Email and token are required");
  }

  // Opsi email yang akan dikirim
  const mailOptions = {
    from: process.env.SMTP_USER, // Pastikan email pengirim diambil dari environment variables
    to: email,
    subject: "Circle-App | Reset Password",
    html: `
      <div style="text-align: center;">
        <h1>Reset Password</h1>
        <p>Click the button below to reset your password.</p>
        <a 
          style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px;" 
          href="${process.env.SERVER_PORT}/reset-password/${token}">
          Reset Password
        </a>
      </div>
    `,
  };

  // Kirim email dan tangani potensi error
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    // Casting error sebagai tipe Error
    if (error instanceof Error) {
      console.error(`Failed to send email: ${error.message}`);
      throw new Error("Failed to send reset password email");
    } else {
      console.error("An unknown error occurred during email sending");
      throw new Error("Unknown error occurred while sending email");
    }
  }
}

export default sendEmail;
