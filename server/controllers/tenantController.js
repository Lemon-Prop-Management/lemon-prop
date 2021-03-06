module.exports = {
    editUser: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        const { first_name, last_name, phone, email } = req.body
        console.log(`1: ${req.session}`)
        console.log(`2: ${req.session.user}`)
        console.log(`3: ${req.session.user.pet}`)
        console.log(`4: ${req.session.user.approved}`)
        console.log(`5: ${req.session.user.prop_id}`)
        let { pet, approved, prop_id } = req.session.user;

        db.tenants.edit_one_tenant([user_id, first_name, last_name, phone, email, pet, approved, prop_id])
            .then(updatedTenant => {
                res.status(200).send(updatedTenant)
            })
            .catch(err => console.log(err))
    },
    getUser: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params

        await db.tenants.get_one_tenant_by_id([user_id])
            .then(tenant => {
                res.status(200).send(tenant)
            })
            .catch(err => console.log(err))
    },
    addMr: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        const { prop_id, subject, request } = req.body //coming from Redux
        let is_compl = false;
        let date_sub = new Date();


        db.mr.add_mr([user_id, prop_id, subject, date_sub, request, is_compl])
            .then(newMaintReq => {
                res.status(200).send(newMaintReq)
            })
            .catch(err => console.log(err))
    },
    getAllMr: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params

        db.mr.get_all_mrs([user_id])
            .then(allMaintReqs => {
                res.status(200).send(allMaintReqs)
            })
            .catch(err => console.log(err))
    },
    getOneMr: async (req, res) => {
        const db = await req.app.get('db')
        const { mr_id } = req.params

        db.mr.get_one_mr([mr_id])
            .then(maintReq => {
                res.status(200).send(maintReq)
            })
            .catch(err => console.log(err))
    },
    getProperty: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        db.properties.get_property_by_user_id([user_id])
            .then(property => {
                res.status(200).send(property)
            })
            .catch(err => console.log(err))
    },
    getAllPayments: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params

        db.tenants.get_all_payments_by_id([user_id])
            .then(payments => {
                res.status(200).send(payments)
            })
            .catch(err => console.log(err))
    },

    getNextDueDate: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params

        db.payments.get_next_due_date([user_id])
            .then(date => {
                res.status(200).send(date)
            })
            .catch(err => console.log(err))
    },

    getRentAmount: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        const [response] = await db.tenants.get_one_tenant_by_id([user_id])
            .catch(err => console.log(err))

        const { prop_id } = response

        db.properties.get_lease_amount_by_prop_id([prop_id])
            .then(leaseAmount => {
                res.status(200).send(leaseAmount)
            })
            .catch(err => console.log(err))
    },

    addPayment: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        const { rentAmount } = req.body
        const date_paid = new Date();

        db.payments.add_payment([user_id, rentAmount, date_paid])
            .then(newPayment => {
                res.status(200).send(newPayment)
            })
            .catch(err => console.log(err))
    }
}

