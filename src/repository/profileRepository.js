const { Op } = require('sequelize');
const {
  Profile, Contract, Job, sequelize,
} = require('../model');

async function getProfileById(id, transaction) {
  return Profile.findOne({ where: { id }, transaction });
}
async function upsertProfile(profile, transaction) {
  return profile.save({ transaction });
}

async function getBestProfessions(start, end) {
  return Profile.findAll(
    {
      attributes: ['profession', [sequelize.fn('sum', sequelize.col('price')), 'totalEarned']],
      group: ['profession'],
      order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
      include: {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        include: {
          model: Job,
          attributes: [],
          where: {
            [Op.and]: [
              {
                paid: { [Op.is]: true },
              },
              { createdAt: { [Op.between]: [start, end] } },
            ],
          },
        },
      },
    },
  );
}

async function getBestClients(start, end, limit = 2) {
  return Profile.findAll(
    {
      attributes: {
        include: [[sequelize.fn('sum', sequelize.col('price')), 'totalPaid']],
      },
      group: ['Profile.id'],
      order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
      where: {
        type: 'client',
      },
      limit,
      subQuery: false,
      include: {
        model: Contract,
        as: 'Client',
        attributes: [],
        include: {
          model: Job,
          attributes: [],
          where: {
            [Op.and]: [
              {
                paid: { [Op.is]: true },
              },
              { createdAt: { [Op.between]: [start, end] } },
            ],
          },
        },
      },
    },

  );
}

module.exports = {
  getProfileById,
  upsertProfile,
  getBestProfessions,
  getBestClients,
};
