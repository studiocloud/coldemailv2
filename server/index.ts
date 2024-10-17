import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

interface SMTPAccount {
  host: string;
  port: number;
  username: string;
  password: string;
}

const smtpAccounts: Record<string, SMTPAccount> = {};

app.post('/api/smtp-account', (req: Request, res: Response) => {
  const { name, host, port, username, password } = req.body;
  smtpAccounts[name] = { host, port, username, password };
  res.json({ message: 'SMTP account added successfully' });
});

app.post('/api/send-email', async (req: Request, res: Response) => {
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});