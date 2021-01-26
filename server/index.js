// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
// const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

// IMPORTED CONTROLLER FILES
const authCtrl = require('./controllers/authController.js');
const managerCtrl = require('./controllers/managerController.js');
const nodeMailerCtrl = require('./controllers/nodeMailerController.js');
const tenantCtrl = require('./controllers/tenantController.js');

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


// stripe.refunds.create({
//     charge: '',
//     reverse_transfer: true,
// })
//     .then(function (refund) {
//         // asynchronously called

//     });


//Auth Controllers
app.post('/auth/request', authCtrl.request);
app.post('/auth/login', authCtrl.login);
app.get('/auth/user', authCtrl.getUserSession);
app.delete('/auth/logout', authCtrl.logout);

//nodeMailer Controllers
app.post('/forgotPassword', nodeMailerCtrl.resetPasswordEmail);
app.post('/send', nodeMailerCtrl.autoApprovedEmail);
app.get('/reset', nodeMailerCtrl.resetPass);
app.put('/updatePasswordViaEmail', nodeMailerCtrl.updatePassword)


//----------------TENANT CONTROLLERS--------------------------------
app.put('/api/tenant/:user_id', tenantCtrl.editUser)
app.post('/api/tenant/:user_id/mr', tenantCtrl.addMr)
app.get('/api/tenant/:user_id/mr', tenantCtrl.getAllMr)
app.get('/api/tenant/:user_id/mr/:mr_id', tenantCtrl.getOneMr)
app.get('/api/tenant/:user_id/payments', tenantCtrl.getAllPayments)


//----------------MANAGER CONTROLLERS--------------------------------
// Maintenance Requests - Manager
app.get('/api/manager/mr/:is_complete', managerCtrl.getMr)
app.get('/api/manager/mr/:mr_id', managerCtrl.getOneMr)

// Properties - Manager
app.get('/api/manager/properties', managerCtrl.getAllProperties)
app.get('/api/manager/properties/:prop_id', managerCtrl.getOneProperty)
app.put('/api/manager/properties/:prop_id', managerCtrl.editOneProperty)
app.post('/api/manager/properties', managerCtrl.addOneProperty)
app.delete('/api/manager/properties/:prop_id', managerCtrl.deleteOneProperty)

// Tenants - Manager
app.get('/api/manager/tenants/:is_approved', managerCtrl.getAllTenantsByStatus)
app.get('/api/manager/tenants/:user_id', managerCtrl.getOneTenant)
app.put('/api/manager/tenants/:user_id', managerCtrl.editOneTenant)
app.post('/api/manager/tenants', managerCtrl.addOneTenant)
app.delete('/api/manager/tenants/:user_id', managerCtrl.deleteOneTenant)




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








