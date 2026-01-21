const express = require('express');
const chatRouter = require('./chatRouter');
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');
const offerRouter = require('./offerRouter');

const router = express.Router();

router.use('/', chatRouter);
router.use('/', contestRouter);
router.use('/', userRouter);
router.use('/', offerRouter);

module.exports = router;
