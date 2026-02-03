import transporter from "@/utils/NodeMailer";

export async function ForgetPasswordMail({ to, name, resetUrl }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Reset your AMU Account Password 🔐",
      html: `
        <h2>Hello ${name},</h2>
        <p>We received a request to reset your AMU Laptop Store account password.</p>
        <p>Click the button below to set a new password:</p>

        <a href="${resetUrl}"
           style="display:inline-block;padding:10px 18px;
           background:#7c3aed;color:#fff;
           text-decoration:none;border-radius:6px;">
           Reset Password
        </a>

        <p>This link is valid for <strong>15 minutes</strong>.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>

        <p>– AMU Laptop Store Team 💻</p>
      `,
    });
  } catch (error) {
    console.error("Forgot Password Email Failed:", error);
  }
}
