const contractRepository = require('../repository/contractRepository');
const { CONTRACT_SERVICE_ERRORS } = require('../utils/enums');
const ServiceError = require('../utils/ServiceError');

async function getContract(contractId, profile) {
  const contract = await contractRepository.getContractById(contractId);
  if (contract.ClientId !== profile.id && contract.ContractorId !== profile.id) {
    // This contract does not belong to this profile
    throw new ServiceError(
      `Unauthorized to access the contract with id ${contractId}`,
      CONTRACT_SERVICE_ERRORS.UNAUTHORIZED_TO_ACCESS_CONTRACT,
    );
  }
  return contract;
}

async function getContracts(profile) {
  const contracts = await contractRepository.getContractsByProfileId(profile.id);
  return contracts;
}

module.exports = {
  getContract,
  getContracts,
};
