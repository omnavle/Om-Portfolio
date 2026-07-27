const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(req, res, next) {
  const { name, email, subject, message } = req.body || {};
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    errors.push("A valid email address is required.");
  }
  if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
    errors.push("Subject must be at least 3 characters.");
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.push("Message must be at least 10 characters.");
  }

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join(" ") });
  }

  next();
}
