import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const getProfile = () => api.get("/profile");
export const getProjects = () => api.get("/projects");
export const getSkills = () => api.get("/skills");
export const getExperience = () => api.get("/experience");
export const getEducation = () => api.get("/education");
export const getAchievements = () => api.get("/achievements");
export const sendContactMessage = (payload) => api.post("/contact", payload);

export default api;
