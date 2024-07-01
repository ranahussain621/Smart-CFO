'use strict'

const express = require('express')
const router = express.Router()
const { addQuery, getQueries, DeleteQuery, queryDetails} = require('../controllers/QueryController')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')

router.route('/add-Query').post(addQuery)
router.route('/get-Queries').get(authenticateToken,getQueries)
router.route('/delete-query').post(authenticateToken,DeleteQuery)
router.route('/get-query-details').post(authenticateToken,queryDetails)


module.exports = router;