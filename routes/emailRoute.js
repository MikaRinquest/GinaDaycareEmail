const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
 require("dotenv").config(); 

// Send Email info
router.post("/", (req, res) => {
  try {
    const { name, surname, tel, address, message } = req.body;

    const email = { name, surname, tel, address, message };
    const transporter = nodemailer.createTransport({
      service: "gmail", //Stating the mailing service we will be using
      auth: {
        user: process.env.MAILER_USER, //Accessing the account in dotenv
        pass: process.env.MAILER_PASS, //Accessing the password in dotenv
      },
    });

    const mailData = {
      from: process.env.MAILER_USER,
      to: process.env.MAILER_USER,
      subject: "Interest in daycare",
      html: `
      <div>
      <p>Hi, my name is ${email.name} ${email.surname}.</p>
      <p>My phone number is: ${email.tel}.</p>
      <p>My email address is: ${email.address}.</p>
      <p> I am interested in: ${email.message}.</p>      
      </div>
      `,
    };
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email valid", success);
      }
    });
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Please check your emails");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
