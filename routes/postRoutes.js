import express from "express";
import protect from "../middleware/authmiddleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment
} from "../controllers/postController.js";
import uploadImage from "../middleware/uploadMiddleware.js";
import { postCreateValidator, commentValidator } from "../utils/validators.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

// Posts CRUD
router.get("/", protect, getPosts);
router.get("/:id", protect, getPostById);
router.post("/", protect, uploadImage.single("image"), postCreateValidator, validate, createPost);
router.put("/:id", protect, uploadImage.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

// Likes & Comments
router.post("/:id/like", protect, likePost);
router.post("/:id/comments", protect, commentValidator, validate, addComment);

export default router;
