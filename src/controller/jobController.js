const jobService = require('../service/jobService');

/**
 * @returns unpaid jobs
 */
async function getUnpaidJobs(req, res) {
  const { profile } = req;
  const jobs = await jobService.getUnpaidJobs(profile);
  return res.json(jobs);
}

/**
 * Pay for a job
 */
async function payJob(req, res) {
  const { profile } = req;
  const { jobId } = req.params;
  const paidJob = await jobService.payJob(jobId, profile);
  return res.json(paidJob);
}

module.exports = {
  getUnpaidJobs,
  payJob,
};
