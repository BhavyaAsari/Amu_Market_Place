import { Resend } from "resend";

export const resend =  new Resend(process.env.RESEND_API_KEY);
console.log("RESEND KEY EXISTS:", !!process.env.RESEND_API_KEY);

export async  function WElcomeMail({to,username}) {

    // console.log("To",to)
    // console.log("username",username);

    await resend.emails.send({

        from:"AMU Laptops <onboarding@resend.dev>",
        to,
        subject:"Sucessfully SignedUp",
        html: `<h2>Welcome ,${username}!</h2>
        <p>Dear ${username} ,your account has been sucessfully created. </P>
        <p>We're excited to have you as our new family member of AMU Laptops </P>
        <br/>
        <b>— AMU Laptops Team</b>`,
    });
}