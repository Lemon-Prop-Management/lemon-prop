const bcrypt = require('bcryptjs')

module.exports = ({
  register: async (req, res) => {

    const db = await req.app.post('db')
    const { first_name, last_name, phone, email, pet, is_approved, prop_id, password, due_date } = req.body
    const isAdmin = false
    const reset_password_token = null
    const reset_password_expires = null

    const [existingUser] = await db.auth.auth_get_user_by_email([email])

    if (existingUser) {
      return res.status(400).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const [newUser] = await db.auth.auth_add_one_user([first_name, last_name, phone, email, hash, due_date, pet, is_approved, isAdmin, prop_id, reset_password_token, reset_password_expires])

    req.session.user = newUser;

    res.status(200).send(newUser)
  },

  login: async (req, res) => {
    const db = await req.app.post('db');
    const { email, password } = req.body
    const [existingUser] = await db.auth.auth_get_user_by_email([email])

    if (!existingUser) {
      return res.status(404).send('No account associated with email.')
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

    if (!isAuthenticated) {
        return res.status(403).send('Incorrect password')
    }
    
    delete existingUser.hash

    req.session.user = {
        email: existingUser.email,
        password: existingUser.hash,
        first_name: existingUser.first_name,
        id: existingUser.id,
        isAdmin: existingUser.isAdmin,
        approved: existingUser.is_approved
    }
    res.status(200).send(existingUser)
  },

  getUserSession: async (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(404).send('No session found')
    }
  },

  logout: async (req, res) => {
    req.session.destroy()
    res.status(200).send('ok')
  }
})