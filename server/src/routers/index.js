const express = require('express');
const chatRouter = require('./chatRouter');
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');
const offerRouter = require('./offerRouter');
const catalogRouter = require('./catalogRouter');
const conversationRouter = require('./conversationRouter');
const messageRouter = require('./messageRouter');

const router = express.Router();

router.use('/', chatRouter);
router.use('/', contestRouter);
router.use('/', userRouter);
router.use('/', offerRouter);
router.use('/', catalogRouter);
router.use('/', conversationRouter);
router.use('/', messageRouter);

module.exports = router;
