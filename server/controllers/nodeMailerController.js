const { hash } = require('bcryptjs');

require('dotenv').config()
const { PASSWORD, USERNAME } = process.env

module.exports = ({
  resetPasswordEmail: async (req, res) => {
    const db = await req.app.post('db');
    const { email, first_name } = req.session.user
    const [existingUser] = await db.auth.auth_get_user_by_email([email])

    //step 0.5 - create token
    const token = crypto.randomBytes(20).toString('hex')
    console.log(token)

    //DB QUERY POSSIBLY NEEDED ON THIS STEP:
    existingUser.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000
    })

    //step 1
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USERNAME,
        pass: PASSWORD
      }
    })

    //step 2
    let mailOPtions = {
      from: 'lemonpropmgmt@gmail.com',
      to: `${email}`,
      subject: 'Reset Password Request',
      text: `A request has been sent to reset your password with Lemon Prop Management. If you did not initiate this request, please ignore this eamil.\n\n
        Please follow this link to reset your password: http://localhost:5555/reset/${token}.\n\n
        Best,\n
        Lemon Prop Management`
    }

    //step 3
    await transporter.sendMail(mailOPtions, function (err, data) {
      if (err) {
        console.log('Error occurred', err)
      } else {
        console.log('sent successfully', data)
      }
    })
  },
  updatePassword: async (req, res) => {
    const {password} = req.body
    const [existingUser] = await db.auth.auth_get_user_by_email([email])

    const salt = bcrypt.hash(password, 10)
    .then(hashedPass => {

        //DB QUERY POSSIBLY NEEDED ON THIS STEP:
        existingUser.update({
            hash: hashedPass,
            resetPasswordToken: null,
            resetPasswordExpires: null
        })
    })
    .then(() => {
        console.log('password updated')
        res.status(200).send({ message: 'password updated'})
    })
  },
  resetPass: async (req, res, next) => {
    const [existingUser] = await db.auth.auth_get_user_by_email([email])
    if (!existingUser) {
        console.log('password reset link is invalid or has expired')
    } else {
        res.status(200).send({
            email: req.session.user.email,
            message: 'password reset link a-ok'
        })
    }
  },
  autoApprovedEmail: async (req, res) => {
    const db = await req.app.post('db');
    const { email, first_name } = req.session.user

    //step 1
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USERNAME,
        pass: PASSWORD
      }
    })

    //step 2
    let mailOPtions = {
      from: 'lemonpropmgmt@gmail.com',
      to: `${email}`,
      subject: 'Welcome to Lemon Prop!',
      text: `Welcome to Lemon Prop Management, ${first_name}.\n\n
        Your account with Lemon Prop has been approved. Please click <a href="http://lemonprop.com">here</a> to login. If you have any suggestions for improvements, please email lemonpropmgmt@gmail.com.\n\n
        Best,\n
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
  },
  tenantAdded: async (req, res) => {
    const db = await req.app.post('db');
    const { email, first_name } = req.session.user

    //step 1
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USERNAME,
        pass: PASSWORD
      }
    })

    //step 2
    let mailOPtions = {
      from: 'lemonpropmgmt@gmail.com',
      to: `${email}`,
      subject: 'Welcome to Lemon Prop!',
      text: `Welcome to Lemon Prop Management, ${first_name}.\n\n
        Your Lemon Prop account has been created. Please click <a href="http://lemonprop.com">here</a> to login.\n\n
        Username: '${email}\n
        Password: 'abc123\n\n
        If you have any suggestions for improvements, please email lemonpropmgmt@gmail.com.\n\n
        Best,\n
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
  }
})