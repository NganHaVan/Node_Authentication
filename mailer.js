var nodemailer= require('nodemailer');

module.exports=function sendConfirmationEmail(user){
    // console.log(user);
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
     const email={
         from:'sender@server.com',
         to:user.email,
         subject:'Welcome to HaVan\'s website',
         text:`
         Welcome to HaVan's website. Please confirm your email.
         ${user.generateConfirmationURL}
         `
     };
     transport.sendMail(email)

    // console.log(email);
 };