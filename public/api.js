// api.js
export async function fetchBoards() {
  const response = await fetch('/api/admin/boards');
  return response.json();
}

export async function createBoard(boardData) {
  const response = await fetch('/api/admin/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardData),
  });
  return response.json();
}
