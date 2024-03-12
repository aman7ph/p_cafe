import nodemailer from "nodemailer"

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amanuel0924@gmail.com",
      pass: "irev kbkv ouya vwgo",
    },
  })
  const mailOptions = {
    from: "ProCafe <pro-cafe@email.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  await transporter.sendMail(mailOptions)
}

export default sendEmail
