const nodemailer =  require('nodemailer');
const sendEmail = async (options)=>{
    var transporter = nodemailer.createTransport({
        service:"gmail",
        auth :{
            user:process.env.Email,
            pass:process.env.EmailAppPassword, // app password without whitespace generate from the google itself 
            // turn 2-step verification on and serch for app password and give app name in our case CMS it will generate 
            // random password remove whitespace we are ready to go 
            
            // we call sned male with option from where we want to use 
        },
    });
    const mailOptions ={ //object 
        from :"Sushil Pandey <susilpanday9@gmail.com",
        to :options.email,
        subject : options.subject,
        text : "your otp is "+options.otp,
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;