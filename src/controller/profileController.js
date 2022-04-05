const { StatusCodes } = require('http-status-codes');
const profileService = require('../service/profileService');

/**
 * Deposit money into the balance of a client
 */
async function depositMoneyToClient(req, res) {
  const { amount } = req.body;
  const { clientId } = req.params;
  if (amount <= 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Amount must be positive',
    });
    return;
  }
  const updatedClient = await profileService.depositMoneyToClient(clientId, amount);
  res.status(StatusCodes.OK).json(updatedClient);
}

module.exports = {
  depositMoneyToClient,
};
