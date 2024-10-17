import React, { useState } from 'react';

const SMTPAccountForm = ({ onSubmit, onCancel }) => {
  const [account, setAccount] = useState({
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(account);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Account Name"
        value={account.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="host"
        placeholder="SMTP Host"
        value={account.host}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="port"
        placeholder="SMTP Port"
        value={account.port}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={account.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={account.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Account
        </button>
      </div>
    </form>
  );
};

export default SMTPAccountForm;