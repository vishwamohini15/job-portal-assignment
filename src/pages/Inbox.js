import React, { useEffect, useState } from 'react';

function InboxPage({ role }) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const allEmails = JSON.parse(localStorage.getItem('emails')) || [];
    const filtered = allEmails.filter(email => email.to === role);
    setEmails(filtered);
  }, [role]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Inbox - {role}</h2>
      {emails.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <ul className="space-y-3">
          {emails.map(email => (
            <li key={email.id} className="p-4 border rounded shadow bg-white">
              <p className="font-semibold">{email.subject}</p>
              <p className="text-sm text-gray-600">{email.timestamp}</p>
              <p>{email.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InboxPage;
