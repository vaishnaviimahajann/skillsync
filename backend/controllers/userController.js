const User = require("../models/User");

async function updateProfile(req, res) {
  try {
    const { name, college, branch, bio, skills, github, linkedin } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, college, branch, bio, skills, github, linkedin },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

async function discoverUsers(req, res) {
  try {
    const { search, skill } = req.query;
    let filter = { _id: { $ne: req.user.id } };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { college: { $regex: search, $options: "i" } },
        { skills: { $in: [new RegExp(search, "i")] } },
      ];
    }
    if (skill) filter.skills = { $in: [new RegExp(skill, "i")] };
    const users = await User.find(filter).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { updateProfile, discoverUsers };
