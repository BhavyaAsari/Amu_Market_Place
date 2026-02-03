import transporter from "@/utils/NodeMailer";

export async function WelcomeMail({ to, name }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Welcome to AMU Laptop Store ",
      html: `
        <h2>Hey 👋, ${name}! </h2>

<p>We’re truly happy to have you with us.</p>

<p>
Your account is all set, and you’re now part of a community that believes in 
<strong>smart choices, honest comparisons, and technology that actually fits your life</strong>.
</p>

<p>
At AMU Laptop Store, you’ll find laptops for every need — whether you’re a student, a professional,
a creator, or someone simply looking for reliability and performance you can trust.
</p>

<p>
Explore top brands, compare specifications with clarity, and discover exclusive deals
designed to give you the best value for your budget.
</p>

<p>
If you ever need help choosing the right device, we’re always here to guide you.
Your perfect laptop is just a few clicks away.
</p>

<p>
Let the smart shopping begin — and welcome to a smoother, smarter tech journey 💻✨
</p>

      `,
    });
  } catch (error) {
    console.error("Welcome mail failed:", error);
  }
}
