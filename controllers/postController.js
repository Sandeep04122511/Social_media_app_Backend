export const createPost = async (req, res) => {
  res.json({ message: "Post created" });
};

export const getPosts = async (req, res) => {
  res.json({ message: "All posts" });
};

export const getPostById = async (req, res) => {
  res.json({ message: `Post ${req.params.id}` });
};

export const updatePost = async (req, res) => {
  res.json({ message: "Post updated" });
};

export const deletePost = async (req, res) => {
  res.json({ message: "Post deleted" });
};

export const likePost = async (req, res) => {
  res.json({ message: "Post liked" });
};

export const addComment = async (req, res) => {
  res.json({ message: "Comment added" });
};
