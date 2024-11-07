// lapo_admin.js 파일은 프론트엔드의 JavaScript 파일로, API 호출 로직을 포함하기에 가장 적합한 위치입니다.
// 이 파일에서 버튼 클릭, 폼 제출 등 이벤트가 발생했을 때 백엔드 API를 호출하여 데이터를 가져오거나 서버에 데이터를 전송하는 코드를 추가할 수 있습니다.
// 예를 들어, 새 보드를 생성하거나 댓글을 추가하는 기능이 있다면, 이곳에 fetch 또는 axios를 사용하여 백엔드의 API를 호출하는 코드를 작성합니다.

// lapo_admin.js

import { fetchBoards, createBoard } from './api.js';

async function init() {
  try {
    const boards = await fetchBoards();
    console.log('Fetched boards:', boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
}

document
  .getElementById('createBoardButton')
  .addEventListener('click', async () => {
    const boardData = {
      title: 'Sample Title',
      content: 'Sample Content',
    };

    try {
      const newBoard = await createBoard(boardData);
      console.log('Board created:', newBoard);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  });

init();

// 예시: 새 게시글 등록 API 호출
async function createNewBoard(boardData) {
  try {
    const response = await fetch('/api/admin/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boardData),
    });
    const result = await response.json();
    console.log('Board created:', result);
  } catch (error) {
    console.error('Error creating board:', error);
  }
}

// 예시: 버튼 클릭 이벤트 핸들러 추가
document.getElementById('createBoardButton').addEventListener('click', () => {
  const boardData = {
    title: 'Sample Board Title',
    content: 'Sample board content',
  };
  createNewBoard(boardData);
});
