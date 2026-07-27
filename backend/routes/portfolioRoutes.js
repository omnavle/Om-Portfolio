import { Router } from "express";
import {
  getProfile,
  getProjects,
  getProjectById,
  getSkills,
  getExperience,
  getEducation,
  getAchievements,
} from "../controllers/portfolioController.js";

const router = Router();

router.get("/profile", getProfile);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.get("/skills", getSkills);
router.get("/experience", getExperience);
router.get("/education", getEducation);
router.get("/achievements", getAchievements);

export default router;
