import nodemailer from "nodemailer";

 const transporter  = nodemailer.createTransport({

      host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

transporter.verify((err) => {

    if(err) {

        console.error("Email error ",err);
    } else {

        console.log("Email server ready");
    }
});

export default transporter;