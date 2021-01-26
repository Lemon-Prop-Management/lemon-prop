module.exports = ({
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

    },
    getAllMr: async (req, res) => {
        const db = await req.app.get('db')

    },
    getOneMr: async (req, res) => {
        const db = await req.app.get('db')

    },
    getAllPayments: async (req, res) => {
        const db = await req.app.get('db')

    }
})





