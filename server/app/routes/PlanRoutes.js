'use strict'

const express = require('express')
const router = express.Router()
const {
    addPlan,
    getPlans,
    getUserPlans,
    addScenerioPlaning,
    getUserScenerioPlaning,
    getScenerioPlaning,
    addScenerioPlaningGoals,
    getScenerioPlaningGoals,
    addScenerioPlanGoals,
    getScenerioPlanGoals,
    addPlanKpi,
    getPlanKpi,
    addPlanData,
    getPlanData,
    DeleteScenerioPlaningGoals,
    getActualValues,
    getGolKpi,
    changePlanStatus
} = require('../controllers/PlanController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-plan').post(addPlan)
router.route('/get-company-plans/:id').get(getUserPlans)
router.route('/get-plans').get(getPlans)


router.route('/add-scenerio-planing').post(addScenerioPlaning)
router.route('/get-plan-scenerio-planings').post(getUserScenerioPlaning)
router.route('/get-scenerio-planings').get(getScenerioPlaning)

router.route('/add-scenerio-planing-goals').post(addScenerioPlaningGoals)
router.route('/get-scenerio-planing-goals').get(getScenerioPlaningGoals)
router.route('/delete-scenerio-planing-goal').post(DeleteScenerioPlaningGoals)
router.route('/add-scenerio-goals-to-plan').post(addScenerioPlanGoals)
router.route('/get-scenerio-goals-of-plan').post(getScenerioPlanGoals)



router.route('/add-plan-kpi').post(addPlanKpi)
router.route('/get-plan-kpi/:id').get(getPlanKpi)

router.route('/change-plan-status/:id').get(changePlanStatus)
router.route('/get-goal-kpi').post(getGolKpi)



router.route('/add-plan-data').post(addPlanData)
router.route('/get-plan-data').post(getPlanData)

router.post('/getActualValues',getActualValues);


module.exports = router;