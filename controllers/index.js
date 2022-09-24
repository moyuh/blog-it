const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoute = require('./dashboardRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dash', dashRoute);

module.exports = router;
