import React, { useEffect, useState } from 'react';

const Inbox = () => {
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('inbox')) || [];
    setInbox(stored);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📬 Inbox</h2>
      {inbox.length === 0 ? (
        <p>No emails yet.</p>
      ) : (
        <ul className="space-y-4">
          {inbox.map((mail) => (
            <li key={mail.id} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500 mb-1">{mail.date}</p>
              <h4 className="font-semibold">{mail.subject}</h4>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{mail.message}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
