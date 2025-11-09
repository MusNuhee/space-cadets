const API_BASE = 'http://localhost:4000/api';

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export async function register(payload) {
  return request('/auth/register', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function login(payload) {
  return request('/auth/login', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function me(token) {
  return request('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}
