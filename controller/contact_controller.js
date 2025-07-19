// const ms = require('ms');
// const nodemailer = require('nodemailer')
// const sendGridTransport = require("nodemailer-sendgrid-transport");
// const { message } = require('statuses');


// //transport
// const transporter = nodemailer.createTransport(
//     sendGridTransport({
//         auth:{
//             api_key: process.env.API_SENDGRID,
//         },
//     })
// );


// const sendEmailController = async (req, res)=>{
//     try{
//         const{name, email, msg} = req.body


//         //validation
//         if(!name || !email || !msg){
//             return res.status(500).send({
//                 success: false,
//                 message: "Please Provide All Fields"
//             })
//         }

//         //email matter here
//        await transporter.sendMail({
//             to: "kothiyalrajkishor1@gmail.com",
//             from : "panditalex8477@gmail.com",
//             html : `
//                 <h4>Detail Information</h4>
//                 <ul>
//                 <li><p>Name : ${name}</p></li>
//                 <li><p>Email : ${email}</p></li>
//                 <li><p>Message : ${msg}</p></li>
//                 </ul>
//             `
//         })

//         return res.status(200).send({
//             success: true,
//             message: "Your MEssage Send Successfully",
//         })
//     } catch (error){
//         console.log(error)
//         return res.status(500).send({
//             success:false,
//             message: "Send Email API Error",
//             error
        
//         })
//     }
// }
// module.exports = {sendEmailController}
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config(); // ✅ Load .env file

// ✅ Setup SendGrid Transporter
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID, // 👈 Make sure this is set in your .env file
    },
  })
);

// ✅ Controller function
const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // ✅ Validate input
    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // ✅ Send the email (await is crucial)
    await transporter.sendMail({
      to: "panditalex8477@gmail.com",      // 👈 Receiver (your email)
      from: "kothiyalrajkishor1@gmail.com",         // 👈 Verified sender in SendGrid
      subject: `New Message from ${name}`,
      html: `
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${msg}</li>
        </ul>
      `,
    });

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Your message was sent successfully!",
    });

  } catch (error) {
    console.error("❌ Send Email Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Send Email API Error",
      error: error.message,
    });
  }
};

module.exports = { sendEmailController };
