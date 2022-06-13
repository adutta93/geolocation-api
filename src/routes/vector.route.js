const express = require('express');
const { CreateVector } = require('../controllers/vector.controller');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth.validator');
const { isSignedIn, isOwner } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/add-vector', isSignedIn, isOwner, CreateVector);

// router.post('/admin/signout', signout);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
