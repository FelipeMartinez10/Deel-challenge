const jobRepository = require('../repository/jobRepository');
const { PROFILE_SERVICE_ERRORS } = require('../utils/enums');
const ServiceError = require('../utils/ServiceError');
const { sequelize } = require('../model');
const profileRepository = require('../repository/profileRepository');

async function depositMoneyToClient(clientId, amount) {
  return sequelize.transaction(async (transaction) => {
    const totalToPayForJobs = await jobRepository.getSumOfJobsToPay(clientId, transaction);
    if (amount > totalToPayForJobs * 0.25) {
      throw new ServiceError(
        `The amount to be deposited cannot exceed 25% of the total to pay for the client's unpaid jobs. ClientId ${clientId}`,
        PROFILE_SERVICE_ERRORS.AMOUNT_CANNOT_EXCEED_THRESHOLD,
      );
    }
    const client = await profileRepository.getProfileById(clientId, transaction);
    client.balance += amount;
    const updatedClient = await profileRepository.upsertProfile(client, transaction);

    return updatedClient;
  });
}

module.exports = {
  depositMoneyToClient,
};
