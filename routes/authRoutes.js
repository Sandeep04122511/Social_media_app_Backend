import express from "express";
import { register, login } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../utils/validators.js";
import validate from "../middleware/validationMiddleware.js";  // ✅ fixed

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

export default router;
