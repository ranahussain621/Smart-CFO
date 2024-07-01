'use strict';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const stripe = require('stripe')('sk_test_51OCJC7GPnuTdSMMJwfH805iRygHta6hQ4j1eWl8hqYsOQm9ULwPKmuZIcY13i9nBLLUYKodOpSCBD57WM3EPTrpg00DBO9eoFK');
const UserModel = require('./app/model/users');

require('dotenv').config();
const dbConfig = require('./app/DBconnection');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // If your request includes credentials (cookies, authorization headers, etc.)
}));

app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: false,
}));

app.use(bodyParser.json({ limit: '50mb' }));

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database Connected Successfully!!');
}).catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
});

// Routers
const authRouter = require('./app/routes/authRoutes');
const accessRouter = require('./app/routes/accessRoutes');
const externalSourceRoutes = require('./app/routes/externalSourceRoutes');
const PlanRoutes = require('./app/routes/PlanRoutes');
const excelRoute = require('./app/routes/csvRoutes');
const queryRoutes = require('./app/routes/queryRoutes')
const balancedScoreCarrdRoutes = require('./app/routes/balancedScoreCard')

app.use('/auth', authRouter);
app.use('/access', accessRouter);
app.use('/quickbook', externalSourceRoutes);
app.use('/plan', PlanRoutes);
app.use('/excel', excelRoute);
app.use('/query', queryRoutes)
app.use('/balanced-card', balancedScoreCarrdRoutes)

// Cron job for retrieving recent subscriptions for each user
cron.schedule('* * * * *', async () => {
    try {
        // Retrieve the list of users from your database
        const users = await UserModel.find();

        // Iterate through each user
        for (const user of users) {
            // Check if user has a valid stripe_user_id
            if (user.stripe_user_id) {
                // Retrieve the subscriptions for the user from Stripe
                const subscriptions = await stripe.subscriptions.list({
                    customer: user.stripe_user_id,
                });

                // Check if subscriptions is defined before accessing data property
                if (subscriptions && subscriptions.data) {
                   
                    
                    // Log whether the user has an active subscription
                    if (subscriptions.data[0].cancel_at==null) {
                        console.log(`User ID: ${user._id} has an active subscription`);
                        // Add your custom logic to handle users with active subscriptions here
                    } else {
                        console.log(`User ID: ${user._id} has no active subscription`);
                        // Set plan_id and stripe_sub_id to null in the database
                        await UserModel.updateOne({ _id: user._id }, { $set: { plan_id: null, stripe_sub_id: null } });
                    }
                } else {
                    console.log(`User ID: ${user._id} has no subscriptions`);
                }
            } else {
                console.log(`User ID: ${user._id} does not have a valid stripe_user_id`);
            }
        }

        console.log('Cron job executed successfully');
    } catch (error) {
        console.error('Error executing cron job:', error.message);
    }
}, {
    scheduled: true,
    timezone: 'America/New_York', // Replace with your timezone (e.g., 'America/New_York')
});

app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
});
