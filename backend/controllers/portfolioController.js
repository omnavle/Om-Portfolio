import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { skillCategories } from "../data/skills.js";
import { experience } from "../data/experience.js";
import { education } from "../data/education.js";
import { achievements } from "../data/achievements.js";

export const getProfile = (req, res) => {
  res.status(200).json({ success: true, data: profile });
};

export const getProjects = (req, res) => {
  res.status(200).json({ success: true, count: projects.length, data: projects });
};

export const getProjectById = (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }
  res.status(200).json({ success: true, data: project });
};

export const getSkills = (req, res) => {
  res.status(200).json({ success: true, data: skillCategories });
};

export const getExperience = (req, res) => {
  res.status(200).json({ success: true, data: experience });
};

export const getEducation = (req, res) => {
  res.status(200).json({ success: true, data: education });
};

export const getAchievements = (req, res) => {
  res.status(200).json({ success: true, data: achievements });
};
