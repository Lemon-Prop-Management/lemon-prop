const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { PASSWORD, USERNAME } = process.env
const crypto = require('crypto')

module.exports = {
  resetPasswordEmail: async (req, res) => {
    const db = await req.app.get('db');
    const { email } = req.body
    const [existingUser] = await db.auth.auth_get_user_by_email([email])

    //step 0.5 - create token
    const token = crypto.randomBytes(20).toString('hex')

    //DB QUERY POSSIBLY NEEDED ON THIS STEP:+
    let reset_password_token = token
    let reset_password_expires = Date.now() + 86400000 //link will be active for 24 hours
    const [resetPass] = await db.nodemailer.update_user_token([email, reset_password_token, reset_password_expires])

    //step 1
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lemonpropmgmt@gmail.com',
        pass: PASSWORD
      }
    })

    //step 2
    let mailOPtions = {
      from: 'lemonpropmgmt@gmail.com',
      to: `${email}`,
      subject: 'Reset Password Request',
      html: `A request has been sent to reset your password with Lemon Prop Management. If you did not initiate this request, please ignore this eamil.<br><br>
        Please follow this link to reset your password: http://localhost:5555/reset/${token}.<br><br>
        Best,<br>
        Lemon Prop Management`
    }

    //step 3
    await transporter.sendMail(mailOPtions, function (err, data) {
      if (err) {
        console.log('Error occurred', err)
      } else {
        console.log('sent successfully', data)
        res.status(200).send(resetPass)
      }
    })
  },
  updatePassword: async (req, res) => {
    const db = await req.app.get('db');
    const { email, password } = req.body
    const [existingUser] = await db.auth.auth_get_user_by_email([email])

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const reset_password_token = null
    const reset_password_expires = null

    const [updatedPass] = await db.nodemailer.update_user_password_and_token([email, hash, reset_password_token, reset_password_expires])
      .then(async (e) => {

        //step 1
        let transporter = await nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'lemonpropmgmt@gmail.com',
            pass: PASSWORD
          }
        })
        //step 2
        let mailOptions = {
          from: 'lemonpropmgmt@gmail.com',
          to: `${email}`,
          subject: 'Updated Password',
          html: `Your account with Lemon Prop has been updated and your password has been reset. If you did not request this change, please contact us at 555-555-5115.<br><br>
            Please click <a href="http://www.lemonprop.com">here</a> to login. If you have any suggestions for improvements, please email lemonpropmgmt@gmail.com.<br><br>
            Best,<br>
            Lemon Prop Management`
        }

        //step 3
        await transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log('Error occurred', err)
            res.status(404).send('nice try, punk')
          } else {
            console.log('sent successfully')
            res.status(200).send('gtg')
          }
        })
        res.status(200).send({ message: 'password updated' })
      })
      .catch(err => console.log(err))
  },
  resetPass: async (req, res, next) => {
    const db = await req.app.get('db');
    const { token } = req.params
    const [existingUser] = await db.nodemailer.get_user_with_token([token])
    if (!existingUser) {
      console.log('1 - password reset link is invalid or has expired')
      res.status(404).send('invalid or expired link, lemonhead')
    } else if (existingUser.reset_password_expires < Date.now()) {
      console.log('2 - password reset link is invalid or has expired')
      res.status(404).send('invalid or expired link, lemonhead')
    } else {
      res.status(200).send({
        email: existingUser.email,
        message: 'password reset link a-ok'
      })
    }
  },
  autoApprovedEmail: async (req, res) => {
    const db = await req.app.get('db');
    const { email, first_name } = req.session.user

    //step 1
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lemonpropmgmt@gmail.com',
        pass: PASSWORD
      }
    })

    //step 2
    let mailOptions = {
      from: 'lemonpropmgmt@gmail.com',
      to: `${email}`,
      subject: 'Welcome to Lemon Prop!',
      html: `Welcome to Lemon Prop Management, ${first_name}.<br><br>
        Your account with Lemon Prop has been approved. Please click <a href="http://www.lemonprop.com">here</a> to login. If you have any suggestions for improvements, please email lemonpropmgmt@gmail.com.<br><br>
        Best,<br>
        Lemon Prop Management`
    }

    //step 3
    await transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error occurred', err)
        res.status(404).send('nice try, punk')
      } else {
        console.log('sent successfully')
        res.status(200).send('gtg')
      }
    })
  }
}