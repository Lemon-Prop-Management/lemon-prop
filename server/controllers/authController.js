module.exports = ({
 register: async (req, res) => {
  const db = await req.app.post('db');

 },

 login: async (req, res) => {
  const db = await req.app.post('db');

 },

 getUserSession: async (req, res) => {
  const db = await req.app.get('db');

 },

 logout: async (req, res) => {
  const db = await req.app.delete('db');

 }
})