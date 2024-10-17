import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const smtpAccounts = {};

app.post('/api/smtp-account', (req, res) => {
  const { name, host, port, username, password } = req.body;
  smtpAccounts[name] = { host, port, username, password };
  res.json({ message: 'SMTP account added successfully' });
});

app.post('/api/send-email', async (req, res) => {
  const { smtpAccount, from, to, subject, body } = req.body;
  
  if (!smtpAccounts[smtpAccount]) {
    return res.status(400).json({ error: 'Invalid SMTP account' });
  }

  const { host, port, username, password } = smtpAccounts[smtpAccount];

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text: body,
    });
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});