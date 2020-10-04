const router = require('express').Router();
const UserRoutes = require('./User-routes');
// const ThoughtsRoutes = require('./Thoughts-routes');

// router.use('/thoughts', ThoughtsRoutes);
router.use('/users', UserRoutes);

module.exports = router;