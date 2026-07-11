function createUserMapper(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };
}

module.exports = { createUserMapper };
