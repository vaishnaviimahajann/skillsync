function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    college: user.college,
    branch: user.branch,
    skills: user.skills,
    bio: user.bio,
    github: user.github,
    linkedin: user.linkedin,
  };
}

module.exports = { toPublicUser };
