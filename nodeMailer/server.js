const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");


const app = express();

app.use(cors());

app.use(bodyParser.json());


app.post("/send-email", async (req, res) => {
  const {subject, text, html } = req.body;
  console.log("Datos recibidos:", req.body);  // Verifica que 'from' se esté recibiendo correctamente

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "extremera.dev@gmail.com",
      pass: "citx fkms mqus jrbc",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Mensaje de empresa." <empresa@gmail.com>',  // Coloca el nombre de la empresa en el "from"
      to: "extremera.dev@gmail.com",
      subject,
      text,
      html,
    });

    res.status(200).json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});