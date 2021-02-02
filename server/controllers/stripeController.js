require('dotenv').config();
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const uuid = require('uuid').v4;


module.exports = {
    payRent: async (req, res) => {
        console.log(req.body);
        let error;
        let status;
        try {
            const { rentAmount, token } = req.body;

            const customer = await
                stripe.customers.create({
                    email: token.email,
                    source: token.id
                });

            const idempotencyKey = uuid();
            const charge = await stripe.charges.create(
                {
                    amount: rentAmount * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `Pay your rent`
                },
                { idempotencyKey }
            );
            status = 'success';
        } catch (err) {
            console.error('Error: ', err);
            status = 'failure'
        }
        res.json({ error, status })
    },
}
