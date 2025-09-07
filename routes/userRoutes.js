import express from "express";
import protect from "../middleware/authmiddleware.js";
import { updateMe, getMe, getUserById } from "../controllers/userController.js";
import uploadImage from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/me", protect, uploadImage.single("avatar"), updateMe);
router.get("/:id", protect, getUserById);

export default router;
