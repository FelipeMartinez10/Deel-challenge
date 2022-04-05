const { Op } = require('sequelize');
const { Contract } = require('../model');

async function getContractById(id) {
  return Contract.findOne({ where: { id } });
}

async function getContractsByProfileId(profileId) {
  return Contract.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }] },
        { status: { [Op.not]: 'terminated' } },
      ],
    },
  });
}

module.exports = {
  getContractById,
  getContractsByProfileId,
};
