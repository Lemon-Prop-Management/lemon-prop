const bcrypt = require('bcryptjs');


module.exports = {

    //Maintenance Requests - Manager

    getMr: async (req, res) => {
        const db = await req.app.post('db')
        const { is_complete } = req.params

        await db.mgr.mgr_get_mr_by_type([is_complete])
            .then(maintReqs => {
                res.status(200).send(maintReqs)
            })
            .catch(err => console.log(err))
    },

    getOneMr: async (req, res) => {
        const db = await req.app.post('db')
        const { mr_id } = req.params

        await db.mgr.mgr_get_mr_by_type([mr_id])
            .then(maintReq => {
                res.status(200).send(maintReq)
            })
            .catch(err => console.log(err))
    },


    // Properties - Manager

    getAllProperties: async (req, res) => {
        const db = await req.app.post('db')

        await db.mgr.mgr_get_all_properties()
            .then(properties => {
                res.status(200).send(properties)
            })
            .catch(err => console.log(err))
    },

    getOneProperty: async (req, res) => {
        const db = await req.app.post('db')
        const { prop_id } = req.params

        await db.mgr.mgr_get_one_property([prop_id])
            .then(property => {
                res.status(200).send(property)
            })
            .catch(err => console.log(err))

    },

    editOneProperty: async (req, res) => {
        const db = await req.app.post('db')
        const { prop_id } = req.params
        const { address, leaseAmt, status } = req.body

        await db.mgr.mgr_edit_one_property([prop_id, address, leaseAmt, status])
            .then(editedProp => {
                res.status(200).send(editedProp)
            })
            .catch(err => console.log(err))

    },
    addOneProperty: async (req, res) => {
        const db = await req.app.post('db')
        const { address, leaseAmt, status } = req.body

        await db.mgr.mgr_add_one_property([address, leaseAmt, status])
            .then(newProp => {
                res.status(200).send(newProp)
            })
            .catch(err => console.log(err))
    },

    deleteOneProperty: async (req, res) => {
        const db = await req.app.post('db')
        const { prop_id } = req.params

        await db.mgr.delete_one_property([prop_id])
            .then(res => {
                res.sendStatus(200)
            })
            .catch(err => console.log(err))
    },



    // Tenants - Manager

    getAllTenantsByStatus: async (req, res) => {
        const db = await req.app.post('db')
        const { is_approved } = req.params

        await db.mgr.mgr_get_all_tenants_by_type([is_approved])
            .then(tenants => {
                res.status(200).send(tenants)
            })
            .catch(err => console.log(err))
    },

    getOneTenant: async (req, res) => {
        const db = await req.app.post('db')
        const { user_id } = req.params

        await db.mgr.mgr_get_one_tenant_by_id([user_id])
            .then(tenant => {
                res.status(200).send(tenant)
            })
            .catch(err => console.log(err))
    },

    editOneTenant: async (req, res) => {
        const db = await req.app.post('db')
        const { user_id } = req.params
        const { first_name, last_name, phone, email, pet, is_approved, prop_id } = req.body

        await db.mgr.mgr_edit_one_tenant([user_id, first_name, last_name, phone, email, pet, is_approved, prop_id])
            .then(updatedTenant => {
                res.status(200).send(updatedTenant)
            })
            .catch(err => console.log(err))
    },

    addOneTenant: async (req, res) => {
        const db = await req.app.post('db')
        const { first_name, last_name, phone, email, pet, is_approved, prop_id, password, due_date } = req.body
        const isAdmin = false

        const [existingUser] = await db.mgr.mgr_get_one_tenant_by_email([email])

        if (existingUser) {
            return res.status(400).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.mgr.mgr_add_one_tenant([first_name, last_name, phone, email, hash, due_date, pet, is_approved, isAdmin, prop_id])

        req.session.user = newUser;

        res.status(200).send(newUser)
    },

    deleteOneTenant: async (req, res) => {
        const db = await req.app.post('db')
        const { user_id } = req.params

        await db.mgr.mgr_delete_one_tenant({ user_id })
            .then(res => {
                res.sendStatus(200)
            })
            .catch(err => console.log(err))
    },
}