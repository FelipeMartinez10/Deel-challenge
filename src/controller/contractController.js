const { StatusCodes } = require('http-status-codes');
const contractService = require('../service/contractService');

/**
 * @returns contract by id
 */
async function getContract(req, res) {
  const { profile } = req;
  const { id } = req.params;
  const contract = await contractService.getContract(id, profile);
  if (!contract) { return res.status(StatusCodes.NOT_FOUND).end(); }
  return res.json(contract);
}

/**
 * @returns contracts by profile id
 */
async function getContracts(req, res) {
  const { profile } = req;
  const contracts = await contractService.getContracts(profile);
  return res.json(contracts);
}
module.exports = {
  getContract,
  getContracts,
};
