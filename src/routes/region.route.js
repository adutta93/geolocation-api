const express = require('express');
const { CreateRegion } = require('../controllers/region.controller');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth.validator');
const { isSignedIn } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/add-region', CreateRegion);

// router.post('/admin/signout', signout);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
