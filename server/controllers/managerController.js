const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { PASSWORD } = process.env

module.exports = {

    //Maintenance Requests - Manager

    getMr: async (req, res) => {
        const db = req.app.get('db')
        const { is_complete } = req.params
        await db.mr.get_mr_by_type([is_complete])
            .then(maintReqs => {
                res.status(200).send(maintReqs)
            })
            .catch(err => console.log(err))
    },

    getOneMr: async (req, res) => {
        const db = req.app.get('db')
        const { mr_id } = req.params
        await db.mr.get_one_mr([mr_id])
            .then(maintReq => {
                res.status(200).send(maintReq)
            })
            .catch(err => console.log(err))
    },

    editOneMr: async (req, res) => {
        const db = req.app.get('db')
        const { mr_id } = req.params
        const { isComplete } = req.body
        await db.mr.edit_one_mr([mr_id, isComplete])
            .then(editedMr => {
                res.status(200).send(editedMr)
            })
            .catch(err => console.log(err))
    },

    // Properties - Manager

    getAllProperties: async (req, res) => {
        const db = await req.app.get('db')
        await db.properties.get_all_properties()
            .then(properties => {
                res.status(200).send(properties)
            })
            .catch(err => console.log(err))
    },

    getOneProperty: async (req, res) => {
        const db = await req.app.get('db')
        const { prop_id } = req.params
        await db.properties.get_one_property([prop_id])
            .then(property => {
                res.status(200).send(property)
            })
            .catch(err => console.log(err))
    },

    editOneProperty: async (req, res) => {
        const db = await req.app.get('db')
        const { prop_id } = req.params
        const { address, leaseAmt, status } = req.body
        await db.properties.edit_one_property([prop_id, address, leaseAmt, status])
            .then(editedProp => {
                res.status(200).send(editedProp)
            })
            .catch(err => console.log(err))
    },

    addOneProperty: async (req, res) => {
        const db = await req.app.get('db')
        const { address, leaseAmt, status } = req.body
        await db.properties.add_one_property([address, leaseAmt, status])
            .then(newProp => {
                res.status(200).send(newProp)
            })
            .catch(err => console.log(err))
    },

    deleteOneProperty: async (req, res) => {
        const db = await req.app.get('db')
        const { prop_id } = req.params
        await db.properties.delete_one_property([prop_id])
            .then(e => {
                res.status(200).send('ok')
            })
            .catch(err => console.log(err))
    },

    // Tenants - Manager

    getAllTenantsByStatus: async (req, res) => {
        const db = req.app.get('db')
        const { is_approved } = req.params
        await db.tenants.get_all_tenants_by_type([is_approved])
            .then(tenants => {
                res.status(200).send(tenants)
            })
            .catch(err => console.log(err))
    },

    getOneTenant: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params
        await db.tenants.get_one_tenant_by_id([user_id])
            .then(tenant => {
                res.status(200).send(tenant)
            })
            .catch(err => console.log(err))
    },

    editOneTenant: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params
        const { first_name, last_name, phone, email, pet, is_approved, prop_id } = req.body
        await db.tenants.edit_one_tenant([user_id, first_name, last_name, phone, email, pet, is_approved, prop_id])
            .then(updatedTenant => {
                res.status(200).send(updatedTenant)
            })
            .catch(err => console.log(err))
    },

    addOneTenant: async (req, res) => {
        const db = req.app.get('db')
        const { first_name, last_name, phone, email, pet, is_approved, prop_id, password, due_date } = req.body
        const isAdmin = false
        const reset_password_token = null
        const reset_password_expires = null
        const [existingUser] = await db.tenants.get_one_tenant_by_email([email])
        if (existingUser) {
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.tenants.add_one_tenant([first_name, last_name, phone, email, hash, due_date, pet, is_approved, isAdmin, prop_id, reset_password_token, reset_password_expires]).catch(err => console.log(err))
        let transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lemonpropmgmt@gmail.com',
                pass: PASSWORD
            }
        })

        let mailOPtions = {
            from: 'lemonpropmgmt@gmail.com',
            to: `${newUser.email}`,
            subject: 'Welcome to Lemon Prop!',
            html: `Welcome to Lemon Prop Management, ${newUser.first_name}.<br><br>
            Your Lemon Prop account has been created. Please click <a href="http://www.lemonprop.com">here</a> to login.<br><br>
            Username: ${newUser.email}<br>
            Password: ${password}<br><br>
            If you have any suggestions for improvements, please email lemonpropmgmt@gmail.com.<br><br>
            Best,<br>
            Lemon Prop Management`
        }

        //step 3
        await transporter.sendMail(mailOPtions, function (err, data) {
            if (err) {
                console.log('Error occurred', err)
            } else {
                console.log('sent successfully')
            }
        })
        res.status(200).send(newUser)
    },

    deleteOneTenant: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params
        await db.tenants.delete_one_tenant([user_id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch(err => console.log(err))
    },

    // Payments - Manager
    getAllPayments: async (req, res) => {
        const db = req.app.get('db')

        await db.payments.get_all_payments()
            .then(payments => {
                res.status(200).send(payments)
            })
            .catch(err => console.log(err))
    }

}