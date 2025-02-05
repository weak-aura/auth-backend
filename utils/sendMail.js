const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "outlook.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "weakaura@outlook.com",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <weakaura@outlook.com>', // sender address
    to: "weakaura1@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);