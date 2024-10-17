import React, { useState } from 'react';
import { Mail, Plus, Send } from 'lucide-react';
import SMTPAccountForm from './components/SMTPAccountForm';
import EmailForm from './components/EmailForm';
import SMTPAccountList from './components/SMTPAccountList';

function App() {
  const [smtpAccounts, setSmtpAccounts] = useState([]);
  const [showAccountForm, setShowAccountForm] = useState(false);

  const addSMTPAccount = (account) => {
    setSmtpAccounts([...smtpAccounts, account]);
    setShowAccountForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Mail className="mr-2" /> Cold Emailer
        </h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">SMTP Accounts</h2>
          <SMTPAccountList accounts={smtpAccounts} />
          {showAccountForm ? (
            <SMTPAccountForm onSubmit={addSMTPAccount} onCancel={() => setShowAccountForm(false)} />
          ) : (
            <button
              onClick={() => setShowAccountForm(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <Plus className="mr-2" /> Add SMTP Account
            </button>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Send Email</h2>
          <EmailForm smtpAccounts={smtpAccounts} />
        </div>
      </div>
    </div>
  );
}

export default App;