export const getMe = async (req, res) => {
  res.json(req.user);
};

export const updateMe = async (req, res) => {
  res.json({ message: "User updated" });
};

export const getUserById = async (req, res) => {
  res.json({ message: `User ${req.params.id}` });
};
