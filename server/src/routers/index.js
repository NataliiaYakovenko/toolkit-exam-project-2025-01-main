const express = require('express');
const chatRouter = require('./chatRouter');
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/', chatRouter);
router.use('/', contestRouter);
router.use('/', userRouter);

module.exports = router;
