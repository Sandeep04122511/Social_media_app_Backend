import express from "express";
import protect from "../middleware/authmiddleware.js";
import { sendMessage, getConversation, markRead } from "../controllers/messageController.js";
import { messageValidator } from "../utils/validators.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", protect, messageValidator, validate, sendMessage);
router.get("/with/:userId", protect, getConversation);
router.post("/with/:userId/read", protect, markRead);

export default router;
