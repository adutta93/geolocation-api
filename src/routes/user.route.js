const express = require('express');
const { signup, signin, GetAllUsers, DeleteUser } = require('../controllers/user.controller');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth.validator');
const { isSignedIn, isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.get('/get-all-user', isSignedIn, isAdmin, GetAllUsers);
router.get('/delete-user/:id', isSignedIn, isAdmin, DeleteUser);

module.exports = router;
