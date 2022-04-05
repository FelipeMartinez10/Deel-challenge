const { sequelize } = require('../model');
const jobRepository = require('../repository/jobRepository');
const profileRepository = require('../repository/profileRepository');
const { JOB_SERVICE_ERRORS } = require('../utils/enums');
const ServiceError = require('../utils/ServiceError');

async function getUnpaidJobs(profile) {
  const unpaidJobs = await jobRepository.getUnpaidJobs(profile.id);

  return unpaidJobs;
}

async function payJob(jobId, profile) {
  return sequelize.transaction(async (transaction) => {
    const job = await jobRepository.getJobById(jobId, transaction);
    if (!job) {
      throw new ServiceError(`The job with id ${jobId} does not exist`, JOB_SERVICE_ERRORS.JOB_NOT_FOUND);
    }
    if (job.paid) {
      throw new ServiceError(`Job with id ${jobId} has already been paid`, JOB_SERVICE_ERRORS.JOB_ALREADY_PAID);
    }
    if (job.Contract.ClientId !== profile.id) {
      throw new ServiceError(
        `Cannot pay for a job (id: ${jobId}) on a contract that does not belong to this client (id: ${profile.id})`,
        JOB_SERVICE_ERRORS.JOB_DOES_NOT_BELONG_TO_CLIENT,
      );
    }
    // Get client
    const client = await profileRepository.getProfileById(profile.id, transaction);
    if (client.balance < job.price) {
      throw new ServiceError(
        `Client (id: ${client.id}) does not have enough balance to pay for this job (id: ${job.id})`,
        JOB_SERVICE_ERRORS.NOT_ENOUGH_BALANCE_TO_PAY_FOR_JOB,
      );
    }
    // Get contractor
    const contractor = await profileRepository.getProfileById(job.Contract.ContractorId, transaction);

    contractor.balance += job.price;
    client.balance -= job.price;
    job.paid = true;
    job.paymentDate = new Date();

    await profileRepository.upsertProfile(client, transaction);
    await profileRepository.upsertProfile(contractor, transaction);
    const updatedJob = await jobRepository.upsertJob(job, transaction);

    return updatedJob;
  });
}

module.exports = {
  getUnpaidJobs,
  payJob,
};
