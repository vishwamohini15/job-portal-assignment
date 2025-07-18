// src/utils/emailSimulator.js

export function sendEmail(role, subject, content) {
  const existing = JSON.parse(localStorage.getItem('emails')) || [];
  const newEmail = {
    id: Date.now(),
    to: role,
    subject,
    content,
    timestamp: new Date().toLocaleString()
  };

  const updated = [newEmail, ...existing];
  localStorage.setItem('emails', JSON.stringify(updated));
}
