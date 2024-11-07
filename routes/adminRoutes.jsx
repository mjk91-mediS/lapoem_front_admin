// # routes : 라우팅 폴더 (API 경로 정의)
// # Admin 관련 API 경로

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin_main', adminController.main);
router.get('/admin_boardList', adminController.mainList);
router.post('/getuserInfo', adminController.getUserInfo);
// 다른 경로들...

module.exports = router;
