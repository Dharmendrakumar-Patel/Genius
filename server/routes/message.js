const express = require('express');
const router = express.Router();

const { createMessage, getAllMessages, removeMessage } = require('../controllers/messageController');

const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.route('/getAllMessages').post(getAllMessages);
router.route('/createMessage').post(createMessage);
router.route('/removeMessage').delete(removeMessage);

module.exports = router;