const express = require('express');
const {
	CreateRegion,
	GetAllRegion,
	GetAllRegionPagination,
	GetRegionById,
	UpdateRegion,
	DeleteRegion,
} = require('../controllers/region.controller');
const { isSignedIn, isOwner } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/add-region', isSignedIn, isOwner, CreateRegion);
router.get('/get-all-region', isSignedIn, GetAllRegion);
router.get('/get-all-region/pagination', isSignedIn, GetAllRegionPagination);
router.get('/get-region-by-id/:id', isSignedIn, GetRegionById);
router.put('/update-region/:id', isSignedIn, isOwner, UpdateRegion);
router.delete('/delete-region/:id', isSignedIn, isOwner, DeleteRegion);

// router.get('/admin/profile', isSignedIn, ifTheOwner, (req, res) => {
// 	res.status(200).json({ user: 'profile' });
// });

module.exports = router;
