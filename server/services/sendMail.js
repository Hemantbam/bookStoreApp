import nodemailer from "nodemailer";
export const sendMaill = async (email, subject, message, details) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hemantbam9865@gmail.com",
        pass: "eyht rdeh eoyk cnuf",
      },
    });

    const mailOptions = {
      from: "hemantbam9865@gmail.com",
      to: email,
      subject: subject,
      text: `${message} Details: ${details}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
