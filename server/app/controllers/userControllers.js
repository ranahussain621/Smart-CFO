"use strict";

const express = require("express");
const router = express.Router();
router.use(express.json());
const pool = require("../DBconnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const catchAsyncFunction = require('../middlewares/catchAsyncFun')
let app = express();
let bodyParser = require("body-parser");
const { query } = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const UserModel = require('../model/users')
const UserVarify = require('../model/userVerifyToken')
const forgetToken = require('../model/forgetToken')
const Role = require('../model/role')
const userRole = require('../model/userRole')
const CFOInvitations = require('../model/CFOInvitations')
const Company = require('../model/Company')
const CFO = require('../model/CFO');
const User = require("../model/users");
const ExternalSources = require('../model/externalSource')
const ForgetTokens = require('../model/forgetToken')
const Plans = require('../model/Plans')
const stripe = require('stripe')('sk_test_51OCJC7GPnuTdSMMJwfH805iRygHta6hQ4j1eWl8hqYsOQm9ULwPKmuZIcY13i9nBLLUYKodOpSCBD57WM3EPTrpg00DBO9eoFK');


///////////Create user/////////////
exports.signup = catchAsyncFunction(async (req, res) => {
    try {

        if (!(req.body.firstName && req.body.email && req.body.password && req.body.lastName)) {
            return res.status(401).json({ 'success': false, error: "please fill all the credentials" })
        } else {
            // create new user
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new UserModel({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                country: req.body.country,
                company: req.body.company,
                password: hashedPassword
            });
            if (req.body.company_id) {
                const company_id = await Company.findById(req.body.company_id);
                const cfo = new CFO({
                    company_id: req.body.company_id,
                    user_id: user._id
                });
                await cfo.save().then(data => { }).catch(err => {
                    res.status(500).send({
                        'success': false,
                        message: err.message || "Some error occurred while creating user"
                    });
                });

            }
            else {
                const compnay = new Company({
                    user_id: user._id,
                    title: req.body.company
                });
                await compnay.save().then(async (data) => {
                    const result = await Company.findByIdAndUpdate(compnay._id, { 'company_id': compnay._id });

                }).catch(err => {
                    res.status(500).send({
                        'success': false,
                        message: err.message || "Some error occurred while creating user"
                    });
                });
            }
            var role;
            if (req.body.role) {
                role = await Role.find({ title: req.body.role });
                if (role.length == 0) {
                    const user = new Role({
                        title: req.body.role,
                    });
                    await user.save().then(data => {

                    }).catch(err => {
                        res.status(500).send({
                            'success': false,
                            message: err.message || "Some error occurred while creating user"
                        });
                    });
                    role = user
                }
            }
            else {
                role = await Role.find({ title: 'admin' });
                if (role.length == 0) {
                    const user = new Role({
                        title: 'admin'
                    });
                    await user.save().then(data => {

                    }).catch(err => {
                        res.status(500).send({
                            'success': false,
                            message: err.message || "Some error occurred while creating user"
                        });
                    });
                    role = user
                }
            }
            const forget_token = new userRole({
                user_id: user._id,
                role_id: role[0]._id
            });
            await forget_token.save().then(data => { }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
            const hashedlink = await bcrypt.hash(req.body.email, 10);

            const varify_user = new UserVarify({
                user_id: user._id,
                token: hashedlink
            });

            console.log(varify_user);
            await varify_user.save().then(data => {
                var transporter = nodemailer.createTransport({
                    host: "smtp.zoho.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: 'testing@cognuitive.com',
                        pass: '.a6evBvb'
                    }
                });
                var link = process.env.apiUrl + "/auth/verify-account?id=" + hashedlink;
                console.log(link);
                var mailOptions = {
                    from: 'testing@cognuitive.com',
                    to: req.body.email,
                    title: 'Smart CFO Inc',
                    subject: 'Welcome to Smart CFO',
                    html: "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'><head>    <meta charset='utf-8'>    <meta name='viewport' content='width=device-width'>    <meta http-equiv='X-UA-Compatible' content='IE=edge'>    <meta name='x-apple-disable-message-reformatting'>    <title></title>    <style id='' media='all'>        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 300;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwaPGR_p.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 300;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 400;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 400;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 700;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwaPGR_p.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 700;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }    </style>    <style>        /* What it does: Remove spaces around the email design added by some email clients. */        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */                html,        body {            margin: 0 auto !important;            padding: 0 !important;            height: 100% !important;            width: 100% !important;            background: #f1f1f1;        }        /* What it does: Stops email clients resizing small text. */                * {            -ms-text-size-adjust: 100%;            -webkit-text-size-adjust: 100%;        }        /* What it does: Centers email on Android 4.4 */                div[style*='margin: 16px 0'] {            margin: 0 !important;        }        /* What it does: Stops Outlook from adding extra spacing to tables. */                table,        td {            mso-table-lspace: 0pt !important;            mso-table-rspace: 0pt !important;        }        /* What it does: Fixes webkit padding issue. */                table {            border-spacing: 0 !important;            border-collapse: collapse !important;            table-layout: fixed !important;            margin: 0 auto !important;        }        /* What it does: Uses a better rendering method when resizing images in IE. */                img {            -ms-interpolation-mode: bicubic;        }        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */                a {            text-decoration: none;        }        /* What it does: A work-around for email clients meddling in triggered links. */                *[x-apple-data-detectors],        /* iOS */                .unstyle-auto-detected-links *,        .aBn {            border-bottom: 0 !important;            cursor: default !important;            color: inherit !important;            text-decoration: none !important;            font-size: inherit !important;            font-family: inherit !important;            font-weight: inherit !important;            line-height: inherit !important;        }        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */                .a6S {            display: none !important;            opacity: 0.01 !important;        }        /* What it does: Prevents Gmail from changing the text color in conversation threads. */                .im {            color: inherit !important;        }        /* If the above doesn't work, add a .g-img class to any image in question. */                img.g-img+div {            display: none !important;        }        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */        /* Create one of these media queries for each additional viewport size you'd like to fix */        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {            u~div .email-container {                min-width: 320px !important;            }        }        /* iPhone 6, 6S, 7, 8, and X */                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {            u~div .email-container {                min-width: 375px !important;            }        }        /* iPhone 6+, 7+, and 8+ */                @media only screen and (min-device-width: 414px) {            u~div .email-container {                min-width: 414px !important;            }        }    </style>    <style>        .primary {            background: #30e3ca;        }                .bg_white {            background: #ffffff;        }                .bg_light {            background: #fafafa;        }                .bg_black {            background: #000000;        }                .bg_dark {            background: rgba(0, 0, 0, .8);        }                .email-section {            padding: 2.5em;        }        /*BUTTON*/                .btn {            padding: 10px 15px;            display: inline-block;        }                .btn.btn-primary {            border-radius: 5px;            background: #30e3ca;            color: #ffffff;        }                .btn.btn-white {            border-radius: 5px;            background: #ffffff;            color: #000000;        }                .btn.btn-white-outline {            border-radius: 5px;            background: transparent;            border: 1px solid #fff;            color: #fff;        }                .btn.btn-black-outline {            border-radius: 0px;            background: transparent;            border: 2px solid #000;            color: #000;            font-weight: 700;        }                h1,        h2,        h3,        h4,        h5,        h6 {            font-family: 'Lato', sans-serif;            color: #000000;            margin-top: 0;            font-weight: 400;        }                body {            font-family: 'Lato', sans-serif;            font-weight: 400;            font-size: 15px;            line-height: 1.8;            color: rgba(0, 0, 0, .4);        }                a {            color: #30e3ca;        }                table {}        /*LOGO*/                .logo h1 {            margin: 0;        }                .logo h1 a {            color: #30e3ca;            font-size: 24px;            font-weight: 700;            font-family: 'Lato', sans-serif;        }        /*HERO*/                .hero {            position: relative;            z-index: 0;        }                .hero .text {            color: rgba(0, 0, 0, .3);        }                .hero .text h2 {            color: #000;            font-size: 40px;            margin-bottom: 0;            font-weight: 400;            line-height: 1.4;        }                .hero .text h3 {            font-size: 24px;            font-weight: 300;        }                .hero .text h2 span {            font-weight: 600;            color: #30e3ca;        }        /*HEADING SECTION*/                .heading-section {}                .heading-section h2 {            color: #000000;            font-size: 28px;            margin-top: 0;            line-height: 1.4;            font-weight: 400;        }                .heading-section .subheading {            margin-bottom: 20px !important;            display: inline-block;            font-size: 13px;            text-transform: uppercase;            letter-spacing: 2px;            color: rgba(0, 0, 0, .4);            position: relative;        }                .heading-section .subheading::after {            position: absolute;            left: 0;            right: 0;            bottom: -10px;            content: '';            width: 100%;            height: 2px;            background: #30e3ca;            margin: 0 auto;        }                .heading-section-white {            color: rgba(255, 255, 255, .8);        }                .heading-section-white h2 {            font-family: line-height: 1;            padding-bottom: 0;        }                .heading-section-white h2 {            color: #ffffff;        }                .heading-section-white .subheading {            margin-bottom: 0;            display: inline-block;            font-size: 13px;            text-transform: uppercase;            letter-spacing: 2px;            color: rgba(255, 255, 255, .4);        }                ul.social {            padding: 0;        }                ul.social li {            display: inline-block;            margin-right: 10px;        }        /*FOOTER*/                .footer {            border-top: 1px solid rgba(0, 0, 0, .05);            color: rgba(0, 0, 0, .5);        }                .footer .heading {            color: #000;            font-size: 20px;        }                .footer ul {            margin: 0;            padding: 0;        }                .footer ul li {            list-style: none;            margin-bottom: 10px;        }                .footer ul li a {            color: rgba(0, 0, 0, 1);        }                @media screen and (max-width: 500px) {}    </style>    <meta name='robots' content='noindex, follow'>    <script nonce='dd803d05-b5a2-41be-8fa8-717dd7f12816'>        (function(w, d) {            ! function(bv, bw, bx, by) {                bv[bx] = bv[bx] || {};                bv[bx].executed = [];                bv.zaraz = {                    deferred: [],                    listeners: []                };                bv.zaraz.q = [];                bv.zaraz._f = function(bz) {                    return function() {                        var bA = Array.prototype.slice.call(arguments);                        bv.zaraz.q.push({                            m: bz,                            a: bA                        })                    }                };                for (const bB of['track', 'set', 'debug']) bv.zaraz[bB] = bv.zaraz._f(bB);                bv.zaraz.init = () => {                    var bC = bw.getElementsByTagName(by)[0],                        bD = bw.createElement(by),                        bE = bw.getElementsByTagName('title')[0];                    bE && (bv[bx].t = bw.getElementsByTagName('title')[0].text);                    bv[bx].x = Math.random();                    bv[bx].w = bv.screen.width;                    bv[bx].h = bv.screen.height;                    bv[bx].j = bv.innerHeight;                    bv[bx].e = bv.innerWidth;                    bv[bx].l = bv.location.href;                    bv[bx].r = bw.referrer;                    bv[bx].k = bv.screen.colorDepth;                    bv[bx].n = bw.characterSet;                    bv[bx].o = (new Date).getTimezoneOffset();                    if (bv.dataLayer)                        for (const bI of Object.entries(Object.entries(dataLayer).reduce(((bJ, bK) => ({...bJ[1],                                ...bK[1]                            }))))) zaraz.set(bI[0], bI[1], {                            scope: 'page'                        });                    bv[bx].q = [];                    for (; bv.zaraz.q.length;) {                        const bL = bv.zaraz.q.shift();                        bv[bx].q.push(bL)                    }                    bD.defer = !0;                    for (const bM of[localStorage, sessionStorage]) Object.keys(bM || {}).filter((bO => bO.startsWith('_zaraz_'))).forEach((bN => {                        try {                            bv[bx]['z_' + bN.slice(7)] = JSON.parse(bM.getItem(bN))                        } catch {                            bv[bx]['z_' + bN.slice(7)] = bM.getItem(bN)                        }                    }));                    bD.referrerPolicy = 'origin';                    bD.src = '/cdn-cgi/zaraz/s.js?z=' + btoa(encodeURIComponent(JSON.stringify(bv[bx])));                    bC.parentNode.insertBefore(bD, bC)                };                ['complete', 'interactive'].includes(bw.readyState) ? zaraz.init() : bv.addEventListener('DOMContentLoaded', zaraz.init)            }(w, d, 'zarazData', 'script');        })(window, document);    </script></head><body width='100%' style='margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;'>    <center style='width: 100%; background-color: #f1f1f1;'>        <div style='display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;'>            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;        </div>        <div style='max-width: 600px; margin: 0 auto;' className='email-container'>            <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>                <tr>                    <td valign='top' className='bg_white' style='padding: 1em 2.5em 0 2.5em;'>                        <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>                            <tr>                                <td className='logo' style='text-align: center;'>                                    <h1><a href='#'>Smart CFO Inc.</a></h1>                                </td>                            </tr>                        </table>                    </td>                </tr>                <tr>                    <td valign='middle' className='hero bg_white' style='padding: 3em 0 2em 0;'>                        <img src='images/email.png' alt='' style='width: 300px; max-width: 600px; height: auto; margin: auto; display: block;'>                    </td>                </tr>                <tr>                    <td valign='middle' className='hero bg_white' style='padding: 2em 0 4em 0;'>                        <table>                            <tr>                                <td>                                    <div className='text' style='padding: 0 2.5em; text-align: center;'>                                        <h2>Please verify your email</h2>                                        <h3>Amazing deals, updates, interesting news right in your inbox</h3>                                        <p><a href='" + link + "' className='btn btn-primary'>Yes! Verify Email Address</a></p>                                    </div>                                </td>                            </tr>                        </table>                    </td>                </tr>            </table>        </div>    </center>    <script async src='https://www.googletagmanager.com/gtag/js?id=UA-23581568-13'></script>    <script>        window.dataLayer = window.dataLayer || [];        function gtag() {            dataLayer.push(arguments);        }        gtag('js', new Date());        gtag('config', 'UA-23581568-13');    </script>    <script defer src='https://static.cloudflareinsights.com/beacon.min.js/vb26e4fa9e5134444860be286fd8771851679335129114' integrity='sha512-M3hN/6cva/SjwrOtyXeUa5IuCT0sedyfT+jK/OV+s+D0RnzrTfwjwJHhd+wYfMm9HJSrZ1IKksOdddLuN6KOzw==' data-cf-beacon='{' rayId        ':'7b28dd480df5a3dc ','token ':'cd0b4b3a733644fc843ef0b185f98241 ','version ':'2023.3.0 ','si ':100}' crossorigin='anonymous'></script></body></html>",
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });
            const token = authToken(user)

            await user.save().then(data => {
                res.send({
                    'success': true,
                    message: "User created successfully! Please verify your account",
                    token: token,
                    user: data

                });
            }).catch(err => {
                res.status(500).send({
                    'success': false,
                    message: err.message || "Some error occurred while creating user"
                });
            });


        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

////////// Login user////////////

const RESPONSE_FAILURE = { 'success': false, message: "invalid credentials" };

exports.login = catchAsyncFunction(async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.json(RESPONSE_FAILURE);
        }

        const { email_verified_at, status, plan_id, _id } = user;

        if (email_verified_at === null) {
            return res.json({ 'success': false, message: "need user verification" });
        } else if (status === 0) {
            return res.json({ 'success': false, message: "Your account is blocked by admin" });
        }
        // else if (plan_id === null) {
        //     return res.json({ 'success': false, message: "You need to buy a plan first" });
        // } 
        else {
            const token = authToken(user);
            const userrole = await userRole.findOne({ user_id: _id });
            const role = await Role.findById(userrole.role_id);
            var company_id;

            if (role.title == 'CFO') {
                const getCFO = await CFO.findOne({ user_id: _id });
                console.log(getCFO, 'getCFO');
                if (getCFO) {
                    company_id = await Company.find({ _id: getCFO.company_id });
                } else {
                    // Handle case where CFO record is not found for the user
                    company_id = null; // or any appropriate default value
                }
            } else {
                company_id = await Company.find({ user_id: _id });
            }


            res.json({
                'success': true,
                message: 'user login successfully!',
                token: token,
                user: user,
                company_ids: company_id,
                'Role': role
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

exports.accountVerify = catchAsyncFunction(async (req, res) => {
    try {
        const user_id_token = await UserVarify.findOne({ token: req.query.id });
        const filter = { _id: user_id_token.user_id };
        const updateDoc = { $set: { email_verified_at: new Date().getTime() } };
        const options = { upsert: true };

        await UserModel.updateOne(filter, updateDoc, options);
        const checkUser = await UserModel.findById(user_id_token.user_id);
        const userrole = await userRole.findOne({ user_id: user_id_token.user_id });
        const role = await Role.findById(userrole.role_id);
        console.log(role);
        if (role.title=="CFO") {
            const link = process.env.frontendUrl + `/login`;
            return res.redirect(link);
        }
        else if (checkUser.plan_id === null) {
            const link = process.env.frontendUrl + `/subscription-plans/${user_id_token.user_id}`;
            return res.redirect(link);
        } else {
            const link = process.env.frontendUrl + '/web/verifiedEmail/';
            return res.redirect(link);
        }
    } catch (error) {
        console.error('Account verification error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Chnage password
exports.changePassword = catchAsyncFunction(async (req, res) => {

    try {
        const user = await UserModel.findById(req.body.id);
        let { newpassword, confirmpassword } = req.body;
        if (newpassword != confirmpassword) {
            return res.json({ message: "newpassword does not match" });
        }
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        var filter = { email: user.email };
        const updateDoc = {
            $set: {
                password: hashedPassword
            },
        };
        const options = { upsert: true };

        const result = await UserModel.updateOne(filter, updateDoc, options);
        res.json({
            message: "Password changed successfully",
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})


exports.assignCompany = catchAsyncFunction(async (req, res) => {
    try {
        const { user_id, company_id } = req.body;

        // Check if the user_id already exists with the same company_id
        const existingCFO = await CFO.findOne({ user_id: user_id, company_id: company_id });
        if (existingCFO) {
            return res.status(400).json({
                success: false,
                message: "User is already assigned to this company"
            });
        }

        // Create a new CFO document
        const company = new CFO({
            user_id: user_id,
            company_id: company_id,
        });

        // Save the document to the database
        const savedCompany = await company.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User  assigned to this company",
            data: savedCompany
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: error.message });
    }
});


exports.userDetails = catchAsyncFunction(async (req, res) => {
    try {
        // const user = await UserModel.findById(req.body.id);

        const { id } = req.params;
        const user = await UserModel.findOne({ _id: id })

        res.json({
            'success': true,
            message: 'user details fetched successfully!',
            user: user
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})
// user update api
exports.userUpdate = catchAsyncFunction(async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    const id = req.body.id;

    // Hash the password if it exists in the request body
    if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    }
    if (req.files.image) {
        let videosPaths = [];


        if (Array.isArray(req.files.image) && req.files.image.length > 0) {
            for (let video of req.files.image) {
                videosPaths.push("/" + video.path);
                req.body.image = req.files.image[0].filename;
            }
        }
    }
    else {
        req.body.image = null;
    }

    try {
        // console.log(req.body);
        const data = await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!data) {
            return res.status(404).send({
                message: `User not found.`
            });
        }

        return res.json({
            success: true,
            message: 'User details updated successfully!',
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message
        });
    }
});


// forget password link  api
exports.forgetLink = catchAsyncFunction(async (req, res) => {

    const user = await UserModel.find({ email: req.body.email });

    if (!user) {
        return res.json({
            'success': false,
            message: "invalid credentials"
        });
    } else {
        const hashedlink = await bcrypt.hash(req.body.email, 10);

        const forget_token = new forgetToken({
            user_id: req.body.email,
            token: hashedlink
        });
        await forget_token.save().then(data => {
            var transporter = nodemailer.createTransport({
                host: "smtp.zoho.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'testing@cognuitive.com',
                    pass: '.a6evBvb'
                }
            });
            var link = process.env.apiUrl + "/auth/forget-password?id=" + hashedlink;
            console.log(link);
            var mailOptions = {
                from: 'testing@cognuitive.com',
                to: req.body.email,
                title: 'Smart CFO Inc',
                subject: 'Please reset your password',
                html: "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'><head>    <meta charset='utf-8'>    <meta name='viewport' content='width=device-width'>    <meta http-equiv='X-UA-Compatible' content='IE=edge'>    <meta name='x-apple-disable-message-reformatting'>    <title></title>    <style id='' media='all'>        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 300;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwaPGR_p.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 300;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 400;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 400;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 700;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwaPGR_p.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 700;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }    </style>    <style>        /* What it does: Remove spaces around the email design added by some email clients. */        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */                html,        body {            margin: 0 auto !important;            padding: 0 !important;            height: 100% !important;            width: 100% !important;            background: #f1f1f1;        }        /* What it does: Stops email clients resizing small text. */                * {            -ms-text-size-adjust: 100%;            -webkit-text-size-adjust: 100%;        }        /* What it does: Centers email on Android 4.4 */                div[style*='margin: 16px 0'] {            margin: 0 !important;        }        /* What it does: Stops Outlook from adding extra spacing to tables. */                table,        td {            mso-table-lspace: 0pt !important;            mso-table-rspace: 0pt !important;        }        /* What it does: Fixes webkit padding issue. */                table {            border-spacing: 0 !important;            border-collapse: collapse !important;            table-layout: fixed !important;            margin: 0 auto !important;        }        /* What it does: Uses a better rendering method when resizing images in IE. */                img {            -ms-interpolation-mode: bicubic;        }        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */                a {            text-decoration: none;        }        /* What it does: A work-around for email clients meddling in triggered links. */                *[x-apple-data-detectors],        /* iOS */                .unstyle-auto-detected-links *,        .aBn {            border-bottom: 0 !important;            cursor: default !important;            color: inherit !important;            text-decoration: none !important;            font-size: inherit !important;            font-family: inherit !important;            font-weight: inherit !important;            line-height: inherit !important;        }        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */                .a6S {            display: none !important;            opacity: 0.01 !important;        }        /* What it does: Prevents Gmail from changing the text color in conversation threads. */                .im {            color: inherit !important;        }        /* If the above doesn't work, add a .g-img class to any image in question. */                img.g-img+div {            display: none !important;        }        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */        /* Create one of these media queries for each additional viewport size you'd like to fix */        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {            u~div .email-container {                min-width: 320px !important;            }        }        /* iPhone 6, 6S, 7, 8, and X */                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {            u~div .email-container {                min-width: 375px !important;            }        }        /* iPhone 6+, 7+, and 8+ */                @media only screen and (min-device-width: 414px) {            u~div .email-container {                min-width: 414px !important;            }        }    </style>    <style>        .primary {            background: #30e3ca;        }                .bg_white {            background: #ffffff;        }                .bg_light {            background: #fafafa;        }                .bg_black {            background: #000000;        }                .bg_dark {            background: rgba(0, 0, 0, .8);        }                .email-section {            padding: 2.5em;        }        /*BUTTON*/                .btn {            padding: 10px 15px;            display: inline-block;        }                .btn.btn-primary {            border-radius: 5px;            background: #30e3ca;            color: #ffffff;        }                .btn.btn-white {            border-radius: 5px;            background: #ffffff;            color: #000000;        }                .btn.btn-white-outline {            border-radius: 5px;            background: transparent;            border: 1px solid #fff;            color: #fff;        }                .btn.btn-black-outline {            border-radius: 0px;            background: transparent;            border: 2px solid #000;            color: #000;            font-weight: 700;        }                h1,        h2,        h3,        h4,        h5,        h6 {            font-family: 'Lato', sans-serif;            color: #000000;            margin-top: 0;            font-weight: 400;        }                body {            font-family: 'Lato', sans-serif;            font-weight: 400;            font-size: 15px;            line-height: 1.8;            color: rgba(0, 0, 0, .4);        }                a {            color: #30e3ca;        }                table {}        /*LOGO*/                .logo h1 {            margin: 0;        }                .logo h1 a {            color: #30e3ca;            font-size: 24px;            font-weight: 700;            font-family: 'Lato', sans-serif;        }        /*HERO*/                .hero {            position: relative;            z-index: 0;        }                .hero .text {            color: rgba(0, 0, 0, .3);        }                .hero .text h2 {            color: #000;            font-size: 40px;            margin-bottom: 0;            font-weight: 400;            line-height: 1.4;        }                .hero .text h3 {            font-size: 24px;            font-weight: 300;        }                .hero .text h2 span {            font-weight: 600;            color: #30e3ca;        }        /*HEADING SECTION*/                .heading-section {}                .heading-section h2 {            color: #000000;            font-size: 28px;            margin-top: 0;            line-height: 1.4;            font-weight: 400;        }                .heading-section .subheading {            margin-bottom: 20px !important;            display: inline-block;            font-size: 13px;            text-transform: uppercase;            letter-spacing: 2px;            color: rgba(0, 0, 0, .4);            position: relative;        }                .heading-section .subheading::after {            position: absolute;            left: 0;            right: 0;            bottom: -10px;            content: '';            width: 100%;            height: 2px;            background: #30e3ca;            margin: 0 auto;        }                .heading-section-white {            color: rgba(255, 255, 255, .8);        }                .heading-section-white h2 {            font-family: line-height: 1;            padding-bottom: 0;        }                .heading-section-white h2 {            color: #ffffff;        }                .heading-section-white .subheading {            margin-bottom: 0;            display: inline-block;            font-size: 13px;            text-transform: uppercase;            letter-spacing: 2px;            color: rgba(255, 255, 255, .4);        }                ul.social {            padding: 0;        }                ul.social li {            display: inline-block;            margin-right: 10px;        }        /*FOOTER*/                .footer {            border-top: 1px solid rgba(0, 0, 0, .05);            color: rgba(0, 0, 0, .5);        }                .footer .heading {            color: #000;            font-size: 20px;        }                .footer ul {            margin: 0;            padding: 0;        }                .footer ul li {            list-style: none;            margin-bottom: 10px;        }                .footer ul li a {            color: rgba(0, 0, 0, 1);        }                @media screen and (max-width: 500px) {}    </style>    <meta name='robots' content='noindex, follow'>    <script nonce='dd803d05-b5a2-41be-8fa8-717dd7f12816'>        (function(w, d) {            ! function(bv, bw, bx, by) {                bv[bx] = bv[bx] || {};                bv[bx].executed = [];                bv.zaraz = {                    deferred: [],                    listeners: []                };                bv.zaraz.q = [];                bv.zaraz._f = function(bz) {                    return function() {                        var bA = Array.prototype.slice.call(arguments);                        bv.zaraz.q.push({                            m: bz,                            a: bA                        })                    }                };                for (const bB of['track', 'set', 'debug']) bv.zaraz[bB] = bv.zaraz._f(bB);                bv.zaraz.init = () => {                    var bC = bw.getElementsByTagName(by)[0],                        bD = bw.createElement(by),                        bE = bw.getElementsByTagName('title')[0];                    bE && (bv[bx].t = bw.getElementsByTagName('title')[0].text);                    bv[bx].x = Math.random();                    bv[bx].w = bv.screen.width;                    bv[bx].h = bv.screen.height;                    bv[bx].j = bv.innerHeight;                    bv[bx].e = bv.innerWidth;                    bv[bx].l = bv.location.href;                    bv[bx].r = bw.referrer;                    bv[bx].k = bv.screen.colorDepth;                    bv[bx].n = bw.characterSet;                    bv[bx].o = (new Date).getTimezoneOffset();                    if (bv.dataLayer)                        for (const bI of Object.entries(Object.entries(dataLayer).reduce(((bJ, bK) => ({...bJ[1],                                ...bK[1]                            }))))) zaraz.set(bI[0], bI[1], {                            scope: 'page'                        });                    bv[bx].q = [];                    for (; bv.zaraz.q.length;) {                        const bL = bv.zaraz.q.shift();                        bv[bx].q.push(bL)                    }                    bD.defer = !0;                    for (const bM of[localStorage, sessionStorage]) Object.keys(bM || {}).filter((bO => bO.startsWith('_zaraz_'))).forEach((bN => {                        try {                            bv[bx]['z_' + bN.slice(7)] = JSON.parse(bM.getItem(bN))                        } catch {                            bv[bx]['z_' + bN.slice(7)] = bM.getItem(bN)                        }                    }));                    bD.referrerPolicy = 'origin';                    bD.src = '/cdn-cgi/zaraz/s.js?z=' + btoa(encodeURIComponent(JSON.stringify(bv[bx])));                    bC.parentNode.insertBefore(bD, bC)                };                ['complete', 'interactive'].includes(bw.readyState) ? zaraz.init() : bv.addEventListener('DOMContentLoaded', zaraz.init)            }(w, d, 'zarazData', 'script');        })(window, document);    </script></head><body width='100%' style='margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;'>    <center style='width: 100%; background-color: #f1f1f1;'>        <div style='display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;'>            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;        </div>        <div style='max-width: 600px; margin: 0 auto;' className='email-container'>            <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>                <tr>                    <td valign='top' className='bg_white' style='padding: 1em 2.5em 0 2.5em;'>                        <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>                            <tr>                                <td className='logo' style='text-align: center;'>                                    <h1><a href='#'>Smart CFO Inc.</a></h1>                                </td>                            </tr>                        </table>                    </td>                </tr>                <tr>                    <td valign='middle' className='hero bg_white' style='padding: 3em 0 2em 0;'>                        <img src='images/email.png' alt='' style='width: 300px; max-width: 600px; height: auto; margin: auto; display: block;'>                    </td>                </tr>                <tr>                    <td valign='middle' className='hero bg_white' style='padding: 2em 0 4em 0;'>                        <table>                            <tr>                                <td>                                    <div className='text' style='padding: 0 2.5em; text-align: center;'>                                        <h2>Hi , lets reset your password.</h2>                                        <h3>if you didn’t ask to reset you password, you can disregard this email.</h3>                                        <p><a href='" + link + "' className='btn btn-primary'>Reset Your Password</a></p>                                    </div>                                </td>                            </tr>                        </table>                    </td>                </tr>            </table>        </div>    </center>    <script async src='https://www.googletagmanager.com/gtag/js?id=UA-23581568-13'></script>    <script>        window.dataLayer = window.dataLayer || [];        function gtag() {            dataLayer.push(arguments);        }        gtag('js', new Date());        gtag('config', 'UA-23581568-13');    </script>    <script defer src='https://static.cloudflareinsights.com/beacon.min.js/vb26e4fa9e5134444860be286fd8771851679335129114' integrity='sha512-M3hN/6cva/SjwrOtyXeUa5IuCT0sedyfT+jK/OV+s+D0RnzrTfwjwJHhd+wYfMm9HJSrZ1IKksOdddLuN6KOzw==' data-cf-beacon='{' rayId        ':'7b28dd480df5a3dc ','token ':'cd0b4b3a733644fc843ef0b185f98241 ','version ':'2023.3.0 ','si ':100}' crossorigin='anonymous'></script></body></html>",
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });
        res.json({
            'success': true,
            message: 'Link sended on your email!',
        });
    }
})



// Account verification
exports.forgetPassword = catchAsyncFunction(async (req, res) => {
    const user_id_token = await forgetToken.find({ token: req.query.id });
    const user_id = await UserModel.find({ email: user_id_token[0].user_id });
    console.log(user_id[0]);
    if (user_id_token.length == 0) {
        res.json({
            success: false,
            message: "account not found",
        });
    } else {
        var link = 'http://localhost:3000/resetpassword/' + user_id[0]._id;
        console.log(link);
        res.redirect(link)

    }

})




exports.users = catchAsyncFunction(async (req, res) => {
    try {
        const users = await UserModel.find();

        const usersWithCompany = await Promise.all(users.map(async (user) => {
            // Fetch company data for the user
            const company = await Company.find({ user_id: user.id });

            let subscriptionDetails = null;
            if (user.stripe_sub_id) {
                try {
                    // Try to retrieve subscription from Stripe
                    const subscription = await stripe.subscriptions.retrieve(user.stripe_sub_id);

                    // If retrieval is successful, extract subscription details
                    subscriptionDetails = {
                        purchaseDate: new Date(subscription.created * 1000), // Convert Unix timestamp to JavaScript Date object
                        amount: subscription.items.data.reduce((total, item) => total + item.price.unit_amount, 0), // Sum up prices of all items
                        currency: subscription.items.data[0].price.currency, // Assuming all items have the same currency
                    };
                } catch (error) {
                    // If retrieval fails (e.g., invalid subscription ID), set subscriptionDetails to null
                    subscriptionDetails = null;
                }
            }

            return {
                ...user.toObject(),
                company: company.map((c) => c.title),
                subscription: subscriptionDetails,
            };
        }));

        res.json({
            success: true,
            data: usersWithCompany,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// get users
exports.inviteCFO = catchAsyncFunction(async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.email, 10);
        var url = process.env.apiUrl + "/auth/accept-invitation?token=" + hash;

        const invitations = new CFOInvitations({
            email: req.body.email,
            company_id: req.body.company_id,
            token: hash
        });
        await invitations.save().then(
            data => {
                var transporter = nodemailer.createTransport({
                    host: "smtp.zoho.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: 'testing@cognuitive.com',
                        pass: '.a6evBvb'
                    }
                });
                var mailOptions = {
                    from: 'testing@cognuitive.com',
                    to: req.body.email,
                    title: 'Smart CFO Inc',
                    subject: 'Welcome to Smart CFO',
                    html: "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'><head>    <meta charset='utf-8'>    <meta name='viewport' content='width=device-width'>    <meta http-equiv='X-UA-Compatible' content='IE=edge'>    <meta name='x-apple-disable-message-reformatting'>    <title></title>    <style id='' media='all'>        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 300;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwaPGR_p.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 300;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 400;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 400;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }        /* latin-ext */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 700;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwaPGR_p.woff2) format('woff2');            unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;        }        /* latin */                @font-face {            font-family: 'Lato';            font-style: normal;            font-weight: 700;            font-display: swap;            src: url(/fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2) format('woff2');            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;        }    </style>    <style>        /* What it does: Remove spaces around the email design added by some email clients. */        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */                html,        body {            margin: 0 auto !important;            padding: 0 !important;            height: 100% !important;            width: 100% !important;            background: #f1f1f1;        }        /* What it does: Stops email clients resizing small text. */                * {            -ms-text-size-adjust: 100%;            -webkit-text-size-adjust: 100%;        }        /* What it does: Centers email on Android 4.4 */                div[style*='margin: 16px 0'] {            margin: 0 !important;        }        /* What it does: Stops Outlook from adding extra spacing to tables. */                table,        td {            mso-table-lspace: 0pt !important;            mso-table-rspace: 0pt !important;        }        /* What it does: Fixes webkit padding issue. */                table {            border-spacing: 0 !important;            border-collapse: collapse !important;            table-layout: fixed !important;            margin: 0 auto !important;        }        /* What it does: Uses a better rendering method when resizing images in IE. */                img {            -ms-interpolation-mode: bicubic;        }        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */                a {            text-decoration: none;        }        /* What it does: A work-around for email clients meddling in triggered links. */                *[x-apple-data-detectors],        /* iOS */                .unstyle-auto-detected-links *,        .aBn {            border-bottom: 0 !important;            cursor: default !important;            color: inherit !important;            text-decoration: none !important;            font-size: inherit !important;            font-family: inherit !important;            font-weight: inherit !important;            line-height: inherit !important;        }        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */                .a6S {            display: none !important;            opacity: 0.01 !important;        }        /* What it does: Prevents Gmail from changing the text color in conversation threads. */                .im {            color: inherit !important;        }        /* If the above doesn't work, add a .g-img class to any image in question. */                img.g-img+div {            display: none !important;        }        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */        /* Create one of these media queries for each additional viewport size you'd like to fix */        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {            u~div .email-container {                min-width: 320px !important;            }        }        /* iPhone 6, 6S, 7, 8, and X */                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {            u~div .email-container {                min-width: 375px !important;            }        }        /* iPhone 6+, 7+, and 8+ */                @media only screen and (min-device-width: 414px) {            u~div .email-container {                min-width: 414px !important;            }        }    </style>    <style>        .primary {            background: #30e3ca;        }                .bg_white {            background: #ffffff;        }                .bg_light {            background: #fafafa;        }                .bg_black {            background: #000000;        }                .bg_dark {            background: rgba(0, 0, 0, .8);        }                .email-section {            padding: 2.5em;        }        /*BUTTON*/                .btn {            padding: 10px 15px;            display: inline-block;        }                .btn.btn-primary {            border-radius: 5px;            background: #30e3ca;            color: #ffffff;        }                .btn.btn-white {            border-radius: 5px;            background: #ffffff;            color: #000000;        }                .btn.btn-white-outline {            border-radius: 5px;            background: transparent;            border: 1px solid #fff;            color: #fff;        }                .btn.btn-black-outline {            border-radius: 0px;            background: transparent;            border: 2px solid #000;            color: #000;            font-weight: 700;        }                h1,        h2,        h3,        h4,        h5,        h6 {            font-family: 'Lato', sans-serif;            color: #000000;            margin-top: 0;            font-weight: 400;        }                body {            font-family: 'Lato', sans-serif;            font-weight: 400;            font-size: 15px;            line-height: 1.8;            color: rgba(0, 0, 0, .4);        }                a {            color: #30e3ca;        }                table {}        /*LOGO*/                .logo h1 {            margin: 0;        }                .logo h1 a {            color: #30e3ca;            font-size: 24px;            font-weight: 700;            font-family: 'Lato', sans-serif;        }        /*HERO*/                .hero {            position: relative;            z-index: 0;        }                .hero .text {            color: rgba(0, 0, 0, .3);        }                .hero .text h2 {            color: #000;            font-size: 40px;            margin-bottom: 0;            font-weight: 400;            line-height: 1.4;        }                .hero .text h3 {            font-size: 24px;            font-weight: 300;        }                .hero .text h2 span {            font-weight: 600;            color: #30e3ca;        }        /*HEADING SECTION*/                .heading-section {}                .heading-section h2 {            color: #000000;            font-size: 28px;            margin-top: 0;            line-height: 1.4;            font-weight: 400;        }                .heading-section .subheading {            margin-bottom: 20px !important;            display: inline-block;            font-size: 13px;            text-transform: uppercase;            letter-spacing: 2px;            color: rgba(0, 0, 0, .4);            position: relative;        }                .heading-section .subheading::after {            position: absolute;            left: 0;            right: 0;            bottom: -10px;            content: '';            width: 100%;            height: 2px;            background: #30e3ca;            margin: 0 auto;        }                .heading-section-white {            color: rgba(255, 255, 255, .8);        }                .heading-section-white h2 {            font-family: line-height: 1;            padding-bottom: 0;        }                .heading-section-white h2 {            color: #ffffff;        }                .heading-section-white .subheading {            margin-bottom: 0;            display: inline-block;            font-size: 13px;            text-transform: uppercase;            letter-spacing: 2px;            color: rgba(255, 255, 255, .4);        }                ul.social {            padding: 0;        }                ul.social li {            display: inline-block;            margin-right: 10px;        }        /*FOOTER*/                .footer {            border-top: 1px solid rgba(0, 0, 0, .05);            color: rgba(0, 0, 0, .5);        }                .footer .heading {            color: #000;            font-size: 20px;        }                .footer ul {            margin: 0;            padding: 0;        }                .footer ul li {            list-style: none;            margin-bottom: 10px;        }                .footer ul li a {            color: rgba(0, 0, 0, 1);        }                @media screen and (max-width: 500px) {}    </style>    <meta name='robots' content='noindex, follow'>    <script nonce='dd803d05-b5a2-41be-8fa8-717dd7f12816'>        (function(w, d) {            ! function(bv, bw, bx, by) {                bv[bx] = bv[bx] || {};                bv[bx].executed = [];                bv.zaraz = {                    deferred: [],                    listeners: []                };                bv.zaraz.q = [];                bv.zaraz._f = function(bz) {                    return function() {                        var bA = Array.prototype.slice.call(arguments);                        bv.zaraz.q.push({                            m: bz,                            a: bA                        })                    }                };                for (const bB of['track', 'set', 'debug']) bv.zaraz[bB] = bv.zaraz._f(bB);                bv.zaraz.init = () => {                    var bC = bw.getElementsByTagName(by)[0],                        bD = bw.createElement(by),                        bE = bw.getElementsByTagName('title')[0];                    bE && (bv[bx].t = bw.getElementsByTagName('title')[0].text);                    bv[bx].x = Math.random();                    bv[bx].w = bv.screen.width;                    bv[bx].h = bv.screen.height;                    bv[bx].j = bv.innerHeight;                    bv[bx].e = bv.innerWidth;                    bv[bx].l = bv.location.href;                    bv[bx].r = bw.referrer;                    bv[bx].k = bv.screen.colorDepth;                    bv[bx].n = bw.characterSet;                    bv[bx].o = (new Date).getTimezoneOffset();                    if (bv.dataLayer)                        for (const bI of Object.entries(Object.entries(dataLayer).reduce(((bJ, bK) => ({...bJ[1],                                ...bK[1]                            }))))) zaraz.set(bI[0], bI[1], {                            scope: 'page'                        });                    bv[bx].q = [];                    for (; bv.zaraz.q.length;) {                        const bL = bv.zaraz.q.shift();                        bv[bx].q.push(bL)                    }                    bD.defer = !0;                    for (const bM of[localStorage, sessionStorage]) Object.keys(bM || {}).filter((bO => bO.startsWith('_zaraz_'))).forEach((bN => {                        try {                            bv[bx]['z_' + bN.slice(7)] = JSON.parse(bM.getItem(bN))                        } catch {                            bv[bx]['z_' + bN.slice(7)] = bM.getItem(bN)                        }                    }));                    bD.referrerPolicy = 'origin';                    bD.src = '/cdn-cgi/zaraz/s.js?z=' + btoa(encodeURIComponent(JSON.stringify(bv[bx])));                    bC.parentNode.insertBefore(bD, bC)                };                ['complete', 'interactive'].includes(bw.readyState) ? zaraz.init() : bv.addEventListener('DOMContentLoaded', zaraz.init)            }(w, d, 'zarazData', 'script');        })(window, document);    </script></head><body width='100%' style='margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;'>    <center style='width: 100%; background-color: #f1f1f1;'>        <div style='display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;'>            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;        </div>        <div style='max-width: 600px; margin: 0 auto;' className='email-container'>            <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>                <tr>                    <td valign='top' className='bg_white' style='padding: 1em 2.5em 0 2.5em;'>                        <table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>                            <tr>                                <td className='logo' style='text-align: center;'>                                    <h1><a href='#'>Smart CFO Inc.</a></h1>                                </td>                            </tr>                        </table>                    </td>                </tr>                <tr>                    <td valign='middle' className='hero bg_white' style='padding: 3em 0 2em 0;'>                        <img src='images/email.png' alt='' style='width: 300px; max-width: 600px; height: auto; margin: auto; display: block;'>                    </td>                </tr>                <tr>                    <td valign='middle' className='hero bg_white' style='padding: 2em 0 4em 0;'>                        <table>                            <tr>                                <td>                                    <div className='text' style='padding: 0 2.5em; text-align: center;'>                                        <h2>Please verify your email</h2>                                        <h3>Amazing deals, updates, interesting news right in your inbox</h3>                                        <p><a href='" + url + "' className='btn btn-primary'>Yes! Accept invitation</a></p>                                    </div>                                </td>                            </tr>                        </table>                    </td>                </tr>            </table>        </div>    </center>    <script async src='https://www.googletagmanager.com/gtag/js?id=UA-23581568-13'></script>    <script>        window.dataLayer = window.dataLayer || [];        function gtag() {            dataLayer.push(arguments);        }        gtag('js', new Date());        gtag('config', 'UA-23581568-13');    </script>    <script defer src='https://static.cloudflareinsights.com/beacon.min.js/vb26e4fa9e5134444860be286fd8771851679335129114' integrity='sha512-M3hN/6cva/SjwrOtyXeUa5IuCT0sedyfT+jK/OV+s+D0RnzrTfwjwJHhd+wYfMm9HJSrZ1IKksOdddLuN6KOzw==' data-cf-beacon='{' rayId        ':'7b28dd480df5a3dc ','token ':'cd0b4b3a733644fc843ef0b185f98241 ','version ':'2023.3.0 ','si ':100}' crossorigin='anonymous'></script></body></html>",
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.status(201).send({
                    'success': true,
                    message: "invitation link sended"
                });
            }
        ).catch(err => {
            res.status(500).send({
                'success': false,
                message: err.message || "Some error occurred while creating user"
            });
        });
        console.log(url);
        res.redirect(url)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})


// get users
exports.getMyTeam = catchAsyncFunction(async (req, res) => {
    try {
        const user = await Company.find({ company_id: req.params.id });
        if (!user) {
            res.json({
                success: false,
                message: 'Compnay not exist',
            });
        }
        else {
            const companycfo = await CFO.find({ company_id: req.params.id })

            const users2 = [];
            companycfo.forEach(element => {
                users2.push(element.user_id);

            });

            const results = await UserModel.find({ _id: users2 })
            res.json({
                success: true,
                data: results,
            });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})



// get users
exports.removeCFoFromTeam = catchAsyncFunction(async (req, res) => {
    try {

        const user = await CFO.findOneAndRemove({ user_id: req.body.user_id });
        const user_delete = await UserModel.findOneAndRemove(req.body.user_id);

        res.json({
            success: true,
            message: "Cfo removed from your team"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})

// get users
exports.acceptInvitation = catchAsyncFunction(async (req, res) => {
    try {

        const user = await CFOInvitations.find({ token: req.query.token });
        // const companyTitle=await Company.find({company_id:user[0].company_id});
        var link = process.env.frontendUrl + '/signup-cfo/' + user[0].id
        console.log(link);
        res.redirect(link)
        // res.json({
        //     success: true,
        //     data:{
        //         // companyTitle:companyTitle[0].title,
        //         email:user[0].email,
        //         company_id:user[0].company_id,
        //         role:'CFO'
        //     }
        // });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})



// get users
exports.companyList = catchAsyncFunction(async (req, res) => {
    try {

        const user = await Company.find();

        res.json({
            success: true,
            data: user,
            message: "companies list "
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})


// Assuming catchAsyncFunction is a utility that handles errors in async routes
exports.companyDetails = catchAsyncFunction(async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }

    const user = await UserModel.findById(company.user_id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Extend the company object with the user's email
    const companyDetails = {
        ...company.toObject(), // If company is a Mongoose document, ensure to convert it to a plain object
        email: user.email
    };

    res.json({
        success: true,
        message: 'Company details fetched successfully!',
        user: companyDetails
    });
});


// Create a company
exports.createCompany = catchAsyncFunction(async (req, res) => {
    // Validate request body
    if (!req.body.title) {
        return res.status(400).json({
            success: false,
            message: "Title and both starting and ending months of the financial year are required"
        });
    }

    try {

        const company = new Company({
            user_id: req.body.user_id, // Where does `user` come from?
            title: req.body.title,
        });

        const savedCompany = await company.save();
        res.status(201).json({
            success: true,
            data: savedCompany
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Some error occurred while creating company"
        });
    }
});


// get users
exports.userCompanyList = catchAsyncFunction(async (req, res) => {
    try {

        const user = await Company.find({ user_id: req.params.id });

        res.json({
            success: true,
            data: user,
            message: "companies list "
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }



})


// get users
exports.companyDelete = catchAsyncFunction(async (req, res) => {
    try {
        const company = await Company.find({ company_id: req.body.id });
        const users = [];
        company.forEach(element => {
            users.push(element.user_id);

        });
        const user_delete = await UserModel.deleteMany({ _id: { $in: users } });
        await Company.deleteMany({ company_id: req.body.id });

        res.json({
            success: true,
            message: "Company deleted successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})


const authToken = (user) => {
    return jwt.sign({
        // email: user.email,
        id: user.email,
        // role: user.role
    },
        process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRY_TIME,
    }
    );
};


exports.subscribeCustomerAndBuyPlan = catchAsyncFunction(async (req, res) => {
    try {
        const { user_id, planId } = req.body;
        const cust_check = await UserModel.find({ _id: user_id });

        if (cust_check.length === 0) {
            return res.json({
                success: false,
                message: "User not exist"
            });
        }

        if (cust_check[0].plan_id !== null) {
            return res.json({
                success: false,
                message: "User already bought a plan"
            });
        }

        // Check if the customer already exists
        let customer = await stripe.customers.list({
            email: cust_check.email,
            limit: 1,
        });

        if (customer.data.length === 0) {
            // If the customer doesn't exist, create a new customer
            customer = await stripe.customers.create({
                email: cust_check.email,
            });
        } else {
            // If the customer already exists, use the existing customer
            customer = customer.data[0];
        }




        // Subscribe the customer to the plan without specifying a payment method
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: planId }],
            collection_method: 'send_invoice', // Send invoices to collect payment later
            days_until_due: 30, // Number of days until the invoice is due
        });
        const filter = { _id: req.body.user_id };
        const updateDoc = { $set: { stripe_user_id: customer.id, plan_id: req.body.planId, stripe_sub_id: subscription.id } };
        const options = { upsert: true };
        await UserModel.updateOne(filter, updateDoc, options);

        res.json({ success: true, customer, subscription });
    } catch (error) {
        console.error('Error creating subscription or customer:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

exports.unsubscribeCustomer = catchAsyncFunction(async (req, res) => {
    try {
        const { user_id } = req.body;
        const cust_check = await UserModel.findById(user_id);

        if (!cust_check) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!cust_check.stripe_sub_id) {
            return res.status(400).json({ error: 'User has no active subscription' });
        }

        const canceledSubscription = await stripe.subscriptions.update(cust_check.stripe_sub_id, {
            cancel_at_period_end: true,
        });

        const filter = { _id: user_id };
        const updateDoc = { $set: { plan_id: null, stripe_sub_id: null } };
        const options = { upsert: true };

        await UserModel.updateOne(filter, updateDoc, options);

        res.json({ canceledSubscription });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Get all plans
exports.getAllPlans = catchAsyncFunction(async (req, res) => {
    try {
        const plans = await stripe.prices.list();

        res.json({ plans: plans.data });
    } catch (error) {
        console.error('Error retrieving plans:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Get all plans
exports.getUserSubscription = catchAsyncFunction(async (req, res) => {
    try {
        const { user_id } = req.body;
        const cust_check = await UserModel.findById(user_id);
        const subscriptions = await stripe.subscriptions.list({
            customer: cust_check.stripe_user_id,
        });

        res.json({ subscriptions: subscriptions.data });
    } catch (error) {
        console.error('Error getting subscriptions:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Get all plans
exports.getAllSubscription = catchAsyncFunction(async (req, res) => {
    try {
        const subscriptions = await stripe.subscriptions.list();

        res.json({ subscriptions: subscriptions.data });
    } catch (error) {
        console.error('Error getting all subscriptions:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get subscriptions for a specific plan API
exports.getPlanSubscription = catchAsyncFunction(async (req, res) => {
    try {
        const planId = req.body.planId;

        const subscriptions = await stripe.subscriptions.list({
            price: planId,
        });

        res.json({ subscriptions: subscriptions.data });
    } catch (error) {
        console.error('Error getting plan subscriptions:', error);
        res.status(500).send('Internal Server Error');
    }
});


exports.getPlanReSubscription = catchAsyncFunction(async (req, res) => {
    try {
        // Find the user by ID
        const cust_check = await UserModel.findById(req.body.user_id);

        // Check if the user exists
        if (!cust_check) {
            return res.status(404).json({ error: 'User not found' });
        }

        const customerId = cust_check.stripe_user_id;

        // Retrieve the customer's active subscriptions, sorted by creation date in descending order
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
            limit: 1, // Limit the result to 1 subscription

        });

        // Check if there is an active subscription
        if (subscriptions.data.length === 0) {
            return res.status(404).json({ error: 'No active subscriptions found' });
        }

        const recentSubscription = subscriptions.data[0];

        // Reactivate the subscription if canceled
        if (recentSubscription.status === 'canceled') {
            try {
                // Reactivate the subscription immediately
                const updatedSubscription = await stripe.subscriptions.update(recentSubscription.id, {
                    items: [{
                        id: recentSubscription.items.data[0].id,
                        price: recentSubscription.items.data[0].price.id,
                    }],
                    billing_cycle_anchor: 'now',
                });

                console.log('Subscription reactivated successfully:', updatedSubscription.id);



                res.json({ success: true, recentSubscription: updatedSubscription });
            } catch (reactivationError) {
                console.error('Error reactivating subscription:', reactivationError);
                return res.status(500).json({ error: 'Error reactivating subscription' });
            }
        } else {
            // No need to reactivate, return the information about the existing subscription
            //    Update user information in the database
            const filter = { id: req.body.user_id };
            const updateDoc = {
                $set: {
                    plan_id: recentSubscription.plan.id,
                    stripe_sub_id: recentSubscription.id,
                },
            };
            const options = { upsert: true };
            // await UserModel.updateOne(filter, updateDoc, options);
            res.json({ success: true, recentSubscription });
        }
    } catch (error) {
        console.error('Error updating customer information:', error);
        res.status(500).send('Internal Server Error');
    }
});



exports.getCfoCompanyDetail = catchAsyncFunction(async (req, res) => {
    try {
        const { id } = req.body;
        const detail = await CFOInvitations.findById({ _id: id })
        console.log(detail, 'detail');
        const companyDetail = await Company.findById({ _id: detail.company_id })
        res.json({
            success: true,
            companyName: companyDetail.title,
            email: detail.email,
            company_id: detail.company_id,
            role: 'CFO'
        })

    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Internal Server Error');
    }
});


exports.removeCompany = catchAsyncFunction(async (req, res) => {
    try {
        await Company.findOneAndRemove({ _id: req.body.id });

        res.json({
            success: true,
            message: "Company deleted successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


})
exports.deleteUser = catchAsyncFunction(async (req, res) => {
    try {
        const userId = req.body.id;

        // Delete user from cfos table
        await CFO.deleteOne({ user_id: userId });

        // Delete user from companies table
        await Company.deleteOne({ user_id: userId });

        // Delete user from externalsources table
        await ExternalSources.deleteOne({ user_id: userId });

        // Delete user from forgettokens table
        await ForgetTokens.deleteOne({ user_id: userId });

        // Delete user from plans table
        await Plans.deleteOne({ user_id: userId });

        // Delete user from userroles table
        await userRole.deleteOne({ user_id: userId });

        // Delete user from uservarifytokens table
        await UserVarify.deleteOne({ user_id: userId });

        // Finally, delete user from users table
        await User.findOneAndRemove({ _id: userId });

        res.json({
            success: true,
            message: "Deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



exports.getCfosCompany = catchAsyncFunction(async (req, res) => {
    const getCFO = await CFO.findOne({ user_id: req.body.userId });
    console.log(getCFO, 'getCFO');
    var company_id;

    if (getCFO) {
        company_id = await Company.find({ _id: getCFO.company_id });
    } else {
        // Handle case where CFO record is not found for the user
        company_id = null; // or any appropriate default value
    }
    res.json({
        success: true,
        company_ids: company_id,
    })
})