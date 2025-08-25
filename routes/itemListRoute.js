const express = require('express');
const router = express.Router();
const { 
    createToBuyItemController,
    getItemsController
 } = require('../controllers/itemListController');
const { verifyToken } = require('../middlewares/authJwt');

router.post('/create-item', verifyToken, createToBuyItemController);
router.get('/get-items',verifyToken,getItemsController)

module.exports = router;