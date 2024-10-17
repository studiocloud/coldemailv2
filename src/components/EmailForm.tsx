import React, { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const EmailForm = ({ smtpAccounts }) => {
  const [email, setEmail] = useState({
    from: '',
    to: '',
    subject: '',
    body: '',
    smtpAccount: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await axios.post('/api/send-email', email);
      setStatus('Email sent successfully!');
    } catch (error) {
      setStatus('Failed to send email. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="smtpAccount"
        value={email.smtpAccount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select SMTP Account</option>
        {smtpAccounts.map((account, index) => (
          <option key={index} value={account.name}>
            {account.name}
          </option>
        ))}
      </select>
      <input
        type="email"
        name="from"
        placeholder="From Email"
        value={email.from}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="to"
        placeholder="To Email"
        value={email.to}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={email.subject}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="body"
        placeholder="Email Body"
        value={email.body}
        onChange={handleChange}
        className="w-full p-2 border rounded h-32"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
      >
        <Send className="mr-2" /> Send Email
      </button>
      {status && <p className="text-center font-semibold">{status}</p>}
    </form>
  );
};

export default EmailForm;