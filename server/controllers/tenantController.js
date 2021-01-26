module.exports = ({
  editUser: async (req, res) => {
    const db = await req.app.get('db')
    const { user_id } = req.params
    const { first_name, last_name, phone, email, password } = req.body

    await db.tenant.tenant_edit_user([user_id, first_name, last_name, phone, email, password])
      .then((editedUser) => {
        res.status(200).send(editedUser)
      })
      .catch(err => console.log(err))
  },

  addMr: async (req, res) => {
    const db = await req.app.get('db')
    const { subject, date_sub, request, photo } = req.body

    await db.tenant.tenant_add_mr([subject, date_sub, request, photo])
      .then((newMr) => {
        res.status(200).send(newMr)
      })
      .catch(err => console.log(err))
  },

  getAllMr: async (req, res) => {
    const db = await req.app.get('db')
    const { user_id } = req.params
    
    await db.tenant.tenant_get_all_mr([])

  },

  getOneMr: async (req, res) => {
    const db = await req.app.get('db')

  },

  getAllPayments: async (req, res) => {
    const db = await req.app.get('db')

  }
})





