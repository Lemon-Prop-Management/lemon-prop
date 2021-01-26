module.exports = {
    editUser: async (req, res) => {
        const db = await req.app.post('db')
        const { user_id } = req.params
        const { first_name, last_name, phone, email } = req.body

        await db.mgr.mgr_edit_one_tenant([user_id, first_name, last_name, phone, email])
            .then(updatedTenant => {
                res.status(200).send(updatedTenant)
            })
            .catch(err => console.log(err))
    },
    addMr: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = params.user
        const { prop_id, subject, date_sub, request, photo } = req.body //coming from Redux
        let is_comp = false;

        await db.tnt.tnt_add_mr([user_id, prop_id, subject, date_sub, request, photo, is_comp])
            .then(newMaintReq => {
                res.status(200).send(newMaintReq)
            })
            .catch(err => console.log(err))
    },
    getAllMr: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = params.user

        await db.tnt.tnt_get_all_mrs([user_id])
            .then(allMaintReqs => {
                res.status(200).send(allMaintReqs)
            })
            .catch(err => console.log(err))
    },
    getOneMr: async (req, res) => {
        const db = await req.app.get('db')
        const { mr_id } = req.params

        await db.tnt.tnt_get_one_mr([mr_id])
            .then(maintReq => {
                res.status(200).send(maintReq)
            })
            .catch(err => console.log(err))
    },
    getAllPayments: async (req, res) => {
        const db = await req.app.get('db')
        const { user_id } = params.user

        await db.tnt.tnt_get_all_payments([user_id])
            .then(payments => {
                res.status(200).send(payments)
            })
            .catch(err => console.log(err))
    }
}
