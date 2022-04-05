const getProfile = async (req, res, next) => {
  const { Profile } = req.app.get('models');
  // TODO use repository. Do not query the db from here.
  const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } });
  if (!profile) return res.status(401).end();
  req.profile = profile;
  return next();
};
module.exports = { getProfile };
