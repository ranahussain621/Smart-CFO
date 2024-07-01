'use strict'

const express = require('express')
const router = express.Router()
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authController = require("../controllers/userControllers");

const { signup, login, accountVerify, users, changePassword, userDetails,
     userUpdate, forgetLink, updatePassword, forgetPassword, blockUsers, 
     unBlockUsers, allUsers, deleteUser,inviteCFO,getMyTeam ,removeCFoFromTeam,
     acceptInvitation,companyList,companyDelete,getInvitationData,getAllPlans,subscribeCustomerAndBuyPlan,getUserSubscription
    ,unsubscribeCustomer,getAllSubscription,getPlanSubscription,getPlanReSubscription,userCompanyList,createCompany,assignCompany,companyDetails,getCfosCompany
} = require('../controllers/userControllers')
const { isAuthenticatedUser, authenticateToken } = require('../middlewares/authMiddlewares')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync("images")) {
            fs.mkdirSync("images");
        }

        if (!fs.existsSync("images")) {
            fs.mkdirSync("images");
        }

        cb(null, "images");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+".png");
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);

        if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
            return cb(new Error("Only audios are allowed!"));
        }

        cb(null, true);
    },
});

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/verify-account').get(accountVerify)
router.route('/forget-password').get(forgetPassword)
router.route('/changePassword').post(changePassword)
// router.route('/user-details').post(userDetails)
// router.route('/user-update').post(userUpdate)
router.route('/user-forget-link').post(forgetLink)
router.route('/users').get(users)
router.route('/delete-user').post(deleteUser)


router.route('/invit-cfo').post(inviteCFO)
router.route('/accept-invitation').get(acceptInvitation)
router.route('/get-my-cfos/:id').get(getMyTeam)
router.route('/remove-cfo-from-team').post(removeCFoFromTeam)
router.route('/get-invited-cfo-detail').post(authController.getCfoCompanyDetail)
router.route('/assign-company').post(assignCompany)


router.route('/company-list').get(companyList)
router.route('/add-company').post(createCompany)
router.route('/company-delete').post(companyDelete)
router.route('/remove-company').post(authController.removeCompany)

router.route('/user-details/:id').get(userDetails)
router.route('/company-details/:id').get(companyDetails)

router.route('/get-all-plans').get(getAllPlans)
router.route('/subscribe-customer-and-buy-plan').post(subscribeCustomerAndBuyPlan)
router.route('/get-user-subscription').post(getUserSubscription)
router.route('/unsubscribe-customer').post(unsubscribeCustomer)
router.route('/re-subscribe-customer-to-plan').post(getPlanReSubscription)
router.route('/get-plan-subscription').post(getPlanSubscription)
router.route('/get-all-subscription').get(getAllSubscription)
router.route('/get-cfos-company').post(getCfosCompany)



router.route('/get-user-companies/:id').get(userCompanyList)


router.put(
    "/user-update",
    upload.fields([{
        name: "image",
        maxCount: 5,
    }, ]),
    authController.userUpdate
);

module.exports = router;