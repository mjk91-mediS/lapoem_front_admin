// # 컨트롤러 폴더 (로직 담당)
// # Admin 관련 API 처리

const { Board, User } = require('../models');

exports.main = async (req, res) => {
  try {
    const boardList = await Board.findAll();
    const userInfo = await User.findAll();
    res.render('admin_main', { boardList, userInfo });
  } catch (error) {
    res.status(500).send('Error loading admin main page');
  }
};

exports.mainList = async (req, res) => {
  try {
    const allBoard = await Board.findAll();
    res.render('admin_boardList', { allBoard });
  } catch (error) {
    res.status(500).send('Error loading board list');
  }
};

exports.getUserInfo = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user info');
  }
};
