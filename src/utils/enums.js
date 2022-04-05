const JOB_SERVICE_ERRORS = {
  JOB_NOT_FOUND: 'JOB_NOT_FOUND',
  JOB_ALREADY_PAID: 'JOB_ALREADY_PAID',
  JOB_DOES_NOT_BELONG_TO_CLIENT: 'JOB_DOES_NOT_BELONG_TO_CLIENT',
  NOT_ENOUGH_BALANCE_TO_PAY_FOR_JOB: 'NOT_ENOUGH_BALANCE_TO_PAY_FOR_JOB',
};

const CONTRACT_SERVICE_ERRORS = {
  UNAUTHORIZED_TO_ACCESS_CONTRACT: 'UNAUTHORIZED_TO_ACCESS_CONTRACT',
};

const PROFILE_SERVICE_ERRORS = {
  AMOUNT_CANNOT_EXCEED_THRESHOLD: 'AMOUNT_CANNOT_EXCEED_THRESHOLD',
};

module.exports = {
  JOB_SERVICE_ERRORS,
  CONTRACT_SERVICE_ERRORS,
  PROFILE_SERVICE_ERRORS,
};