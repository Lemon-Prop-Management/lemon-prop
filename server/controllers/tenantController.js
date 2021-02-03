module.exports = {
    editUser: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        const { first_name, last_name, phone, email } = req.body

        db.tnt.tnt_edit_one_tenant([user_id, first_name, last_name, phone, email])
            .then(updatedTenant => {
                res.status(200).send(updatedTenant)
            })
            .catch(err => console.log(err))
    },
    addMr: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        const { prop_id, subject, date_sub, request, photo } = req.body //coming from Redux
        let is_compl = false;

        db.tnt.tnt_add_mr([user_id, prop_id, subject, date_sub, request, photo, is_compl])
            .then(newMaintReq => {
                res.status(200).send(newMaintReq)
            })
            .catch(err => console.log(err))
    },
    getAllMr: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params

        db.tnt.tnt_get_all_mrs([user_id])
            .then(allMaintReqs => {
                res.status(200).send(allMaintReqs)
            })
            .catch(err => console.log(err))
    },
    getOneMr: async (req, res) => {
        const db = await req.app.get('db')
        const { mr_id } = req.params

        db.tnt.tnt_get_one_mr([mr_id])
            .then(maintReq => {
                res.status(200).send(maintReq)
            })
            .catch(err => console.log(err))
    },
    getAllPayments: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params

        db.tnt.tnt_get_all_payments([user_id])
            .then(payments => {
                res.status(200).send(payments)
            })
            .catch(err => console.log(err))
    },

    getNextDueDate: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params

        db.tnt.tnt_get_next_due_date([user_id])
            .then(date => {
                res.status(200).send(date)
            })
            .catch(err => console.log(err))
    },

    getRentAmount: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = req.params
        console.log('controller: ', user_id)

        const [response] = await db.tnt.tnt_get_one_tenant_by_id([user_id])
            .catch(err => console.log(err))

        console.log('console.logging in controller:   ', response.prop_id)
        const { prop_id } = response

        db.tnt.tnt_get_rent_amount([prop_id])
            .then(leaseAmount => {
                res.status(200).send(leaseAmount)
            })
            .catch(err => console.log(err))
    }
}
