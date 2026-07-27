import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // Allows the API to be demoed/tested without SMTP credentials configured.
      console.log("[contact] SMTP not configured — logging message instead:", {
        name,
        email,
        subject,
        message,
      });
      return res.status(200).json({
        success: true,
        message: "Message received (email delivery is not configured on this server yet).",
      });
    }

    await getTransporter().sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: receiver,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #0A0F14;">
          <h2 style="color:#18C28E;">New portfolio contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-line;">${message}</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("[contact] Failed to send message:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
