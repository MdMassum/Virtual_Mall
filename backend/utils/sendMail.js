const nodeMailer = require('nodemailer')

const sendMail = async (options) =>{

    host = process.env.SMPT_HOST;
    port = process.env.SMPT_PORT;

    const transporter = nodeMailer.createTransport({
    
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.EmailId,
            pass:process.env.Email_Password,
        }
    })
  
    const mailOptions = {
        from:process.env.EmailId,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions)
}
module.exports = sendMail;