const { createTransport } = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

module.exports = async (to, name,type, subject, template) => {
  try {
    const transporter = createTransport({
      host: process.env.HOST,
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const handlebarsOptions = {
      viewEngine: {
        extname: ".handlebars",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarsOptions));

    const mailOptions = {
      from: {
        name: "Ask AAU Team",
        address: process.env.EMAIL,
      },
      to: to,
      subject: subject,
      template: template, // e.g., 'suggestionSuccess'
      context: {
        name,
        type,
      },
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email send error:", error);
  }
};
