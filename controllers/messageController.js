export const sendMessage = async (req, res) => {
  res.json({ message: "Message sent" });
};

export const getConversation = async (req, res) => {
  res.json({ message: `Conversation with ${req.params.userId}` });
};

export const markRead = async (req, res) => {
  res.json({ message: `Conversation with ${req.params.userId} marked as read` });
};
