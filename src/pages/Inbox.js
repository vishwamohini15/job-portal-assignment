import React, { useEffect, useState } from 'react';

function InboxPage({ role }) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const allEmails = JSON.parse(localStorage.getItem('emails')) || [];
    const filtered = allEmails.filter(email => email.to === role);
    setEmails(filtered);
  }, [role]);

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inbox - {role}</h2>

      {emails.length === 0 ? (
        <p className="text-gray-500 text-sm">No messages yet.</p>
      ) : (
        <ul className="space-y-5">
          {emails.map(email => (
            <li
              key={email.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-lg text-gray-800">{email.subject}</p>
              <p className="text-xs text-gray-500 mb-2">{email.timestamp}</p>
              <p className="text-sm text-gray-700">{email.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InboxPage;
