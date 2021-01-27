// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authenticateUser = require('./middlewares/authenticateUser.js');
// const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

// IMPORTED CONTROLLER FILES
const authCtrl = require('./controllers/authController.js');
const managerCtrl = require('./controllers/managerController.js');
const nodeMailerCtrl = require('./controllers/nodeMailerController.js');
const tenantCtrl = require('./controllers/tenantController.js');

// IMPORTED VARIABLES
const { STRIPE_SECRET_KEY, SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

//Stripe
//const { default: StripeCheckout } = require('react-stripe-checkout');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const uuid = require('uuid').v4;

// ACTIVATIONS
const app = express();

//MIDDLEWARE
app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
)


// stripe.refunds.create({
//     charge: '',
//     reverse_transfer: true,
// })
//     .then(function (refund) {
//         // asynchronously called

//     });


//Auth Controllers
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/user', authCtrl.getUserSession);
app.delete('/auth/logout', authCtrl.logout);

//nodeMailer Controllers
app.post('/forgotPassword', nodeMailerCtrl.resetPasswordEmail);
app.post('/send', nodeMailerCtrl.autoApprovedEmail);
app.get('/reset/:token', nodeMailerCtrl.resetPass);
app.put('/updatePasswordViaEmail', nodeMailerCtrl.updatePassword)


//----------------TENANT CONTROLLERS--------------------------------
app.put('/api/tenant/:user_id', tenantCtrl.editUser)
app.post('/api/tenant/:user_id/mr', tenantCtrl.addMr)
app.get('/api/tenant/:user_id/mr', tenantCtrl.getAllMr)
app.get('/api/tenant/:user_id/mr/:mr_id', tenantCtrl.getOneMr)
app.get('/api/tenant/:user_id/payments', tenantCtrl.getAllPayments)
app.get('/api/tenant/:user_id/due', tenantCtrl.getNextDueDate)



//----------------MANAGER CONTROLLERS--------------------------------
// Maintenance Requests - Manager
app.get('/api/manager/mr/:is_complete', authenticateUser, managerCtrl.getMr)
app.get('/api/manager/mr/one/:mr_id', authenticateUser, managerCtrl.getOneMr)
app.put('/api/manager/mr/:mr_id', authenticateUser, managerCtrl.editOneMr)

// Properties - Manager
app.get('/api/manager/properties', authenticateUser, managerCtrl.getAllProperties)
app.get('/api/manager/properties/:prop_id', authenticateUser, managerCtrl.getOneProperty)
app.put('/api/manager/properties/:prop_id', authenticateUser, managerCtrl.editOneProperty)
app.post('/api/manager/properties', authenticateUser, managerCtrl.addOneProperty)
app.delete('/api/manager/properties/:prop_id', authenticateUser, managerCtrl.deleteOneProperty)

// Tenants - Manager
app.get('/api/manager/tenants/:is_approved', authenticateUser, managerCtrl.getAllTenantsByStatus)
app.get('/api/manager/tenants/one/:user_id', authenticateUser, managerCtrl.getOneTenant)
app.put('/api/manager/tenants/:user_id', authenticateUser, managerCtrl.editOneTenant)
app.post('/api/manager/tenants', authenticateUser, managerCtrl.addOneTenant)
app.delete('/api/manager/tenants/:user_id', authenticateUser, managerCtrl.deleteOneTenant)

// Payments - Manager
app.get('/api/manager/payments', authenticateUser, managerCtrl.getAllPayments)


//STRIPE Endpoint
app.post('/payment', async (req, res) => {
    console.log(req.body);

    let error;
    let status;
    try {
        const { rentAmount, token } = req.body;

        const customer = await
            stripe.customers.create({
                email: token.email,
                source: token.id
            });

        const idempotencyKey = uuid();
        const charge = await stripe.charges.create(
            {
                amount: rentAmount * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `Pay your rent`
            },
            { idempotencyKey }
        );
        status = 'success';
    } catch (err) {
        console.error('Error: ', err);
        status = 'failure'
    }
    res.json({ error, status })
})

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('db connected')
    app.listen(SERVER_PORT, () => {
        console.log(`A sour lemonServer is jamming on port ${SERVER_PORT}`)
    })
})
