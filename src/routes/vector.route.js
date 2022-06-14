const express = require('express');
const {
	CreateVector,
	SearchThroughQueryParams,
	GetVectorById,
	GetAllVectors,
	GetAllVectorsPagination,
	UpdateVector,
	DeleteVector,
} = require('../controllers/vector.controller');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth.validator');
const { isSignedIn, isOwner } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/add-vector', isSignedIn, isOwner, CreateVector);
router.get('/search/vector', isSignedIn, SearchThroughQueryParams);
router.get('/vector/:id', isSignedIn, GetVectorById);
router.get('/get-all-vector', isSignedIn, GetAllVectors);
router.get('/get-all-vector/pagination', isSignedIn, GetAllVectorsPagination);
router.put('/vector-update/:id', isSignedIn, isOwner, UpdateVector);
router.delete('/delete-vector/:id', isSignedIn, isOwner, DeleteVector);
// router.post('/admin/signout', signout);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
