const express = require('express');
const { signup, signin } = require('../controllers/user.controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth.validator');
const { isSignedIn } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
// router.post('/admin/signout', signout);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
