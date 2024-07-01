'use strict'

const express = require('express')
const router = express.Router()
const { addKpi, getKpis, DeleteKpi } = require('../controllers/KpiController')
const { addExternalSource, callback, getQuickbookData,getKPIValuesAndPlans,getDashboardValues } = require('../controllers/externalSourceController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-external-source-data').post(addExternalSource)
router.route('/callback').get(callback)
router.route('/get-quickbook-data-scenario-plan').post(getQuickbookData)


router.route('/get-quickbook-data-balance-scorecard').post(getKPIValuesAndPlans)

router.route('/get-quickbook-data-dashboard').post(getDashboardValues)

router.route('/add-Kpi').post(addKpi)
router.route('/getKpis').get(getKpis)
router.route('/delete-kpi').post(DeleteKpi)


module.exports = router;