// 1. notifyNewBooks:

// Firestore에서 newBooks 컬렉션과 users 컬렉션을 불러와, 각 사용자의 선호 장르에 맞는 신간 도서를 필터링합니다.
// 사용자가 선호하는 장르에 해당하는 신간이 있다면, sendEmail 함수를 호출하여 사용자에게 알림 이메일을 전송합니다.

// 2.addNewBook:

// 클라이언트에서 새로운 도서 데이터를 받아서 Firestore의 newBooks 컬렉션에 추가합니다.
// 새로 추가된 도서가 다른 사용자에게 알림으로 전달될 수 있도록 Firestore에 데이터를 저장합니다.

const firebaseAdmin = require('firebase-admin'); // Firebase Admin SDK 초기화
const { sendEmail } = require('../utils/emailSender'); // nodemailer를 통한 이메일 전송 함수
const firestore = firebaseAdmin.firestore(); // Firestore 인스턴스

// 신간 도서 알림 컨트롤러 생성
const newAPIController = {};

// 사용자의 선호 장르에 따라 신간 도서 알림 전송
newAPIController.notifyNewBooks = async (req, res) => {
  try {
    // Firestore에서 신간 도서 데이터를 가져옴
    const booksSnapshot = await firestore.collection('newBooks').get();
    const newBooks = booksSnapshot.docs.map((doc) => doc.data());

    // Firestore에서 사용자 정보 가져오기
    const usersSnapshot = await firestore.collection('users').get();
    const users = usersSnapshot.docs.map((doc) => doc.data());

    // 각 사용자에게 알림 보내기
    users.forEach((user) => {
      // 사용자의 선호 장르와 일치하는 신간 도서를 필터링
      const recommendedBooks = newBooks.filter((book) =>
        user.preferredGenres.includes(book.genre)
      );

      if (recommendedBooks.length > 0) {
        // 사용자에게 전송할 이메일 내용 생성
        const bookList = recommendedBooks
          .map((book) => `- ${book.title} by ${book.author}`)
          .join('\n');
        const emailContent = `Hello ${user.name},\n\nWe have some new books in your favorite genres:\n\n${bookList}\n\nEnjoy your reading!`;

        // 이메일 전송
        sendEmail(user.email, 'New Books Available!', emailContent);
        console.log(`Email sent to ${user.email}`);
      }
    });

    res
      .status(200)
      .json({ message: 'Notifications sent successfully to all users.' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Failed to send notifications.' });
  }
};

// 신간 도서 목록을 Firestore에 추가하는 API
newAPIController.addNewBook = async (req, res) => {
  try {
    const { title, author, genre, releaseDate } = req.body;

    // 새로운 도서를 Firestore의 'newBooks' 컬렉션에 추가
    const newBook = {
      title,
      author,
      genre,
      releaseDate,
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    };

    await firestore.collection('newBooks').add(newBook);

    res.status(201).json({ message: 'New book added successfully.' });
  } catch (error) {
    console.error('Error adding new book:', error);
    res.status(500).json({ error: 'Failed to add new book.' });
  }
};

// 새로운 API Controller 내보내기
module.exports = newAPIController;
