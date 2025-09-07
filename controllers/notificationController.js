export const getMyNotifications = async (req, res) => {
  res.json({ message: "Here are your notifications" });
};

export const readAll = async (req, res) => {
  res.json({ message: "All notifications marked as read" });
};
