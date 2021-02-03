// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authenticateUser = require('./middlewares/authenticateUser.js');


// IMPORTED CONTROLLER FILES
const authCtrl = require('./controllers/authController.js');
const managerCtrl = require('./controllers/managerController.js');
const nodeMailerCtrl = require('./controllers/nodeMailerController.js');
const tenantCtrl = require('./controllers/tenantController.js');
const stripeCtrl = require('./controllers/stripeController')

// IMPORTED VARIABLES
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;


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
app.get('/api/tenant/:user_id', tenantCtrl.getUser)
app.post('/api/tenant/:user_id/mr', tenantCtrl.addMr)
app.get('/api/tenant/:user_id/mr', tenantCtrl.getAllMr)
app.get('/api/tenant/:user_id/mr/:mr_id', tenantCtrl.getOneMr)
app.get('/api/tenant/:user_id/payments', tenantCtrl.getAllPayments)
app.get('/api/tenant/:user_id/due', tenantCtrl.getNextDueDate)
app.get('/api/tenant/:user_id/rent', tenantCtrl.getRentAmount)



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
app.post('/pay_rent', stripeCtrl.payRent)

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