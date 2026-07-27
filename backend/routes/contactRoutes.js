import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendContactMessage } from "../controllers/contactController.js";
import { validateContact } from "../middleware/validateContact.js";

const router = Router();

// Limits abuse of the contact endpoint since there is no auth/database layer.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
});

router.post("/", contactLimiter, validateContact, sendContactMessage);

export default router;
