const bcrypt = require('bcrypt')

module.exports = ({
  register: async (req, res) => {
    const db = await req.app.post('db');
    const { first_name, last_name, phone, email, password } = req.body
    const isAdmin = false

    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
      await db.tenant.tenant_register(first_name, last_name, phone, email, hashedPassword)
        .then((response) => {
          res.status(200).send({ email: response[0].email })
        })
        .catch(err => {
          res.status(500).send({
            errorMessage: "failed to register user."
          });
          console.log(err)
        });
    }).catch(err => {
      console.log({ err })
      res.status(500).json({ errorMessage: 'Failed to hash password' })
    })
  },

  login: async (req, res) => {
    const db = await req.app.post('db');
    const { email, password } = req.body

    await db.user_login(email)
      .then((response) => {
        if (response.length) {
          bcrypt.compare(password, response[0].password)
            .then(passwordsMatch => {
              if (passwordsMatch) {
                req.session.user = response[0];
                res.status(200).send({ user: req.session.user });
              } else {
                res.status(402).send({ errorMessage: 'Wrong password. Please try again' })
              }
            })
        } else {
          res.status(403).send({ errorMessage: "That has not been created" })
        }
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Failed to login. Please try again." });
      });
  },

  getUserSession: async (req, res) => {
    const db = await req.app.get('db');

  },

  logout: async (req, res) => {
    const db = await req.app.delete('db');

  }
})