const express = require('express');
const { CreateRegion, GetAllRegion, GetAllRegionPagination } = require('../controllers/region.controller');
const { isSignedIn, isOwner } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/add-region', isSignedIn, isOwner, CreateRegion);
router.get('/get-all-region', isSignedIn, GetAllRegion);
router.get('/get-all-region/pagination', isSignedIn, GetAllRegionPagination);

router.post('/admin/profile', isSignedIn, (req, res) => {
	res.status(200).json({ user: 'profile' });
});

module.exports = router;
