const API_BASE = '/api';

export async function fetchGames(params = {}) {
  const query = new URLSearchParams();
  if (params.civilization && params.civilization !== 'All') query.set('civilization', params.civilization);
  if (params.category && params.category !== 'All') query.set('category', params.category);
  if (params.ageGroup && params.ageGroup !== 'All') query.set('ageGroup', params.ageGroup);
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);

  const res = await fetch(`${API_BASE}/games?${query.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch games (${res.status})`);
  }
  return res.json();
}

export async function fetchGameById(id) {
  const res = await fetch(`${API_BASE}/games/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to load game (${res.status})`);
  }
  return res.json();
}

export async function generateConceptAI(inputData) {
  const res = await fetch(`${API_BASE}/ai/generate-concept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.details ? err.details.join(', ') : err.error || 'Failed to generate concept with Gemini AI');
  }
  return res.json();
}

export async function saveGameConcept(gameData) {
  const res = await fetch(`${API_BASE}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save game concept');
  }
  return res.json();
}

export async function updateGameConcept(id, gameData) {
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update game concept');
  }
  return res.json();
}

export async function deleteGameConcept(id) {
  const res = await fetch(`${API_BASE}/games/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete game concept');
  }
  return res.json();
}

export async function likeGame(id) {
  const res = await fetch(`${API_BASE}/games/${id}/like`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to like game');
  return res.json();
}

export async function forkGame(id) {
  const res = await fetch(`${API_BASE}/games/${id}/fork`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to fork game concept');
  return res.json();
}

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error('Failed to load student dashboard');
  return res.json();
}

export async function submitReview(reviewData) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to submit review');
  }
  return res.json();
}

export async function simulatePlaytestStep(payload) {
  const res = await fetch(`${API_BASE}/ai/playtest-step`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Playtest simulation failed');
  }
  return res.json();
}
