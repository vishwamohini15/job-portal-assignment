export const sendEmail = (to, subject, message) => {
  const inbox = JSON.parse(localStorage.getItem('inbox')) || [];
  const newMail = {
    id: Date.now(),
    to,
    subject,
    message,
    date: new Date().toLocaleString(),
  };
  inbox.unshift(newMail); // latest on top
  localStorage.setItem('inbox', JSON.stringify(inbox));
};
