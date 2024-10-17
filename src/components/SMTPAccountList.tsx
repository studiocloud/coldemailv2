import React from 'react';
import { Mail } from 'lucide-react';

const SMTPAccountList = ({ accounts }) => {
  return (
    <div className="space-y-2 mb-4">
      {accounts.map((account, index) => (
        <div key={index} className="flex items-center bg-gray-100 p-2 rounded">
          <Mail className="mr-2" />
          <span>{account.name} - {account.username}</span>
        </div>
      ))}
    </div>
  );
};

export default SMTPAccountList;