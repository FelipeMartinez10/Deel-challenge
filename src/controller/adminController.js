const adminService = require('../service/adminService');

async function getBestProfession(req, res) {
  const { query: { start, end } } = req;
  const bestProfession = await adminService.getBestProfession(start, end);
  return res.json(bestProfession);
}

async function getBestClients(req, res) {
  const { query: { start, end, limit } } = req;
  const bestClients = await adminService.getBestClients(start, end, limit);
  return res.json(bestClients);
}
module.exports = {
  getBestProfession,
  getBestClients,
};
