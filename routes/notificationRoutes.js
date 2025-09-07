import express from "express";
import protect from "../middleware/authmiddleware.js";
import { getMyNotifications, readAll } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);
router.post("/read-all", protect, readAll);

export default router;
