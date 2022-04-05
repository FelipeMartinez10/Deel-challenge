const { Op } = require('sequelize');
const { Job, Contract } = require('../model');

async function getUnpaidJobs(profileId) {
  return Job.findAll({
    where: {
      paid: { [Op.not]: true },
    },
    include: {
      model: Contract,
      where: {
        [Op.and]: [
          { [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }] },
          { status: { [Op.not]: 'terminated' } },
        ],
      },
      required: true,
    },
  });
}

async function getJobById(jobId, transaction) {
  return Job.findOne({
    where: {
      id: jobId,
    },
    include: {
      model: Contract,
      required: true,
    },
    transaction,
  });
}

async function upsertJob(job, transaction) {
  return job.save({ transaction });
}

async function getSumOfJobsToPay(clientId, transaction) {
  return Job.sum(
    'price',
    {
      where: { paid: { [Op.not]: true } },
      include: {
        model: Contract,
        where: { ClientId: clientId },
        required: true,
      },
      transaction,
    },
  );
}

module.exports = {
  getUnpaidJobs,
  getJobById,
  upsertJob,
  getSumOfJobsToPay,

};
