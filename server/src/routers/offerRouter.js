const express = require('express');
const offerController = require('../controllers/offerController');
const {
  filterOffersByRole,
  tabuCreativeInfoForModerator,
  pagination,
  offerIsPending,
} = require('../middlewares/offerMiddle');
const { onlyForModerator } = require('../middlewares/moderationMiddle');

const router = express.Router();

router.get(
  '/offers',
  pagination,
  filterOffersByRole,
  tabuCreativeInfoForModerator,
  offerController.getOffers,
);

router.patch(
  '/offers/:offerId/moderate',
  onlyForModerator,
  offerIsPending,
  offerController.moderateOffer,
);

module.exports = router;
