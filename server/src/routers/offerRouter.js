const express = require('express');
const offerController = require('../controllers/offerController');
const {
  filterOffersByRole,
  tabuCreativeInfoForModerator,
  pagination,
  offerIsPending,
} = require('../middlewares/offerMiddle');
const { onlyForModerator } = require('../middlewares/moderationMiddle');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.get(
  '/offers',
  checkToken.checkToken,
  pagination,
  filterOffersByRole,
  tabuCreativeInfoForModerator,
  offerController.getOffers,
);

router.patch(
  '/offers/:offerId/moderate',
  checkToken.checkToken,
  onlyForModerator,
  offerIsPending,
  offerController.moderateOffer,
);

module.exports = router;
