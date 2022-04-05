const profileRepository = require('../repository/profileRepository');

async function getBestProfession(start, end) {
  const professionsOrderedByTotalEarned = await profileRepository.getBestProfessions(start, end);
  // Taking first element because we only want the best Profession
  return professionsOrderedByTotalEarned[0];
}

async function getBestClients(start, end, limit) {
  const bestClients = await profileRepository.getBestClients(start, end, limit);
  // Parsing result to match expected json
  const parsedClients = bestClients.map((client) => ({ id: client.id, fullName: `${client.firstName} ${client.lastName}`, paid: client.dataValues.totalPaid }));
  return parsedClients;
}

module.exports = {
  getBestProfession,
  getBestClients,
};
