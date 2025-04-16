'use client';

import { useState } from 'react';

export default function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus('✅ Invitation sent!');
      setEmail('');
    } else {
      setStatus(`❌ ${result.error}`);
    }
  }

  return (
    <form onSubmit={handleInvite} className="space-y-4 max-w-md p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold text-primary">Invite a new user</h2>
      <input
        type="email"
        placeholder="user@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Send Invite
      </button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  );
}
