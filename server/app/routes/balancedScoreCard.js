'use strict'

const express = require('express')
const router = express.Router()
const { addBalancedScoreCard ,getBalancedScoreCard,addScorCardKpi,getScorCardKpi,updateScoreCardKpi,deleteScoreCard} = require('../controllers/balancedScoreCardController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-balanced-score-card').post(addBalancedScoreCard)


router.route('/get-balanced-score-cards/:id').get(getBalancedScoreCard)

router.route('/add-score-card-kpi').post(addScorCardKpi)
router.route('/get-score-card-kpis/:id').get(getScorCardKpi)

router.route('/update-score-card-kpi').post(updateScoreCardKpi)

router.route('/delete-score-card/:id').get(deleteScoreCard)


module.exports = router;