
const express = require('express');
const router = express.Router();
const { updateProfile, discoverUsers, uploadResume } = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.put('/profile', auth, updateProfile);
router.get('/discover', auth, discoverUsers);
router.post('/resume', auth, upload.single('resume'), uploadResume);

module.exports = router;